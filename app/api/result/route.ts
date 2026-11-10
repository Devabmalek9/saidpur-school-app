import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// 📊 শিক্ষা বোর্ডের স্ট্যান্ডার্ড অনুযায়ী গ্রেড এবং জিপিএ ক্যালকুলেশন
function calculateGradeAndGPA(totalMarks: number, isPassed: boolean) {
  if (!isPassed || totalMarks < 33) return { grade: 'F', gpa: 0.00 };
  if (totalMarks >= 80) return { grade: 'A+', gpa: 5.00 };
  if (totalMarks >= 70) return { grade: 'A', gpa: 4.00 };
  if (totalMarks >= 60) return { grade: 'A-', gpa: 3.50 };
  if (totalMarks >= 50) return { grade: 'B', gpa: 3.00 };
  if (totalMarks >= 40) return { grade: 'C', gpa: 2.00 };
  return { grade: 'D', gpa: 1.00 };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId')?.trim();
  const examTerm = searchParams.get('examTerm');

  if (!studentId || !examTerm) {
    return NextResponse.json({ error: 'প্রয়োজনীয় প্যারামিটার missing রয়েছে' }, { status: 400 });
  }

  try {
    // 🎯 সরাসরি PostgreSQL ডাটাবেজ থেকে সুনির্দিষ্ট শিক্ষার্থী এবং তার ফলাফল রিড করা
    const studentData = await prisma.student.findFirst({
      where: { studentId: studentId },
      include: { 
        results: { 
          where: { examTerm: examTerm } 
        } 
      }
    });

    if (!studentData) {
      return NextResponse.json({ error: `রোল ${studentId} এর কোনো প্রোফাইল ডাটাবেজে পাওয়া যায়নি।` }, { status: 404 });
    }

    const totalSubjects = studentData.results?.length || 0;
    if (totalSubjects === 0) {
      return NextResponse.json({ error: `শিক্ষার্থীর প্রোফাইল পাওয়া গেছে, কিন্তু এই পরীক্ষার কোনো ফলাফল এখনও আপলোড করা হয়নি।` }, { status: 404 });
    }

    let totalGpaPoints = 0;
    let isAnySubjectFailed = false;

    // শিক্ষকরা ডাটাবেজে যে বিষয়গুলো ইনপুট দিয়েছেন সেগুলোকে অটো প্রসেস করা হচ্ছে
    const processedResults = studentData.results.map(sub => {
      // CQ, MCQ এবং Practical-এর আলাদা পাস মার্ক স্বয়ংক্রিয় চেকিং
      const subjectPassed = sub.cqMarks >= sub.cqPass && sub.mcqMarks >= sub.mcqPass && sub.pracMarks >= sub.pracPass;
      const { grade, gpa } = calculateGradeAndGPA(sub.totalMarks, subjectPassed);
      
      if (grade === 'F') isAnySubjectFailed = true;
      totalGpaPoints += grade === 'F' ? 0 : gpa;

      return { 
        id: sub.id,
        subject: sub.subject,
        cqMarks: sub.cqMarks,
        mcqMarks: sub.mcqMarks,
        mcqPass: sub.mcqPass,
        pracMarks: sub.pracMarks,
        totalMarks: sub.totalMarks,
        grade, 
        gpa 
      };
    });

    const finalGpa = isAnySubjectFailed ? 0.00 : (totalGpaPoints / totalSubjects);

    return NextResponse.json({
      name: studentData.name,
      studentId: studentData.studentId,
      class: studentData.class,
      section: studentData.section,
      rollNo: studentData.rollNo,
      meritPosition: studentData.meritPosition,
      character: studentData.character,
      results: processedResults,
      finalGpa: finalGpa.toFixed(2)
    });

  } catch (error: any) {
    console.error("Database Query Error:", error.message);
    return NextResponse.json({ error: 'ডাটাবেজ রিড করতে সমস্যা হচ্ছে।' }, { status: 500 });
  }
}
