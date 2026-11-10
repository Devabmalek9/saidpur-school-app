import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db'; // ২-স্তর গভীরতা পাথ ফিক্সড

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, subject, cqMarks, mcqMarks, pracMarks, examTerm } = body;

    if (!studentId || !subject || !examTerm) {
      return NextResponse.json({ success: false, error: '⚠️ শিক্ষার্থী আইডি, বিষয় এবং পরীক্ষার টার্ম দেওয়া বাধ্যতামূলক।' }, { status: 400 });
    }

    // ১. আইডি ক্লিনিং ও ফন্ট কনভার্ট (বাংলা থেকে ইংরেজি সংখ্যা)
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const cleanStudentId = String(studentId).trim().replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)));
    const cleanExamTerm = String(examTerm).trim().toUpperCase();

    const cq = parseFloat(String(cqMarks).replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)))) || 0;
    const mcq = parseFloat(String(mcqMarks).replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)))) || 0;
    const prac = parseFloat(String(pracMarks).replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)))) || 0;
    const total = cq + mcq + prac;

    let grade = 'F';
    let gpa = 0.0;
    if (total >= 80) { grade = 'A+'; gpa = 5.0; }
    else if (total >= 70) { grade = 'A'; gpa = 4.0; }
    else if (total >= 60) { grade = 'A-'; gpa = 3.5; }
    else if (total >= 50) { grade = 'B'; gpa = 3.0; }
    else if (total >= 40) { grade = 'C'; gpa = 2.0; }
    else if (total >= 33) { grade = 'D'; gpa = 1.0; }

    // 🎯 ২. মেগা রিলেশন ফিক্স: প্রথমে Student টেবিল থেকে শিক্ষার্থীর অরিজিনাল ডাটাবেজ UUID খুঁজে বের করা
    const targetStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { studentId: cleanStudentId },
          { id: cleanStudentId }
        ]
      }
    });

    if (!targetStudent) {
      return NextResponse.json({ success: false, error: `⚠️ ডাটাবেজে ${cleanStudentId} আইডির কোনো স্থায়ী শিক্ষার্থীর প্রোফাইল নেই। প্রথমে এডমিট কার্ড ডাউনলোড পেজে চেক করুন।` }, { status: 404 });
    }

    // 🎯 ৩. অরিজিনাল UUID লিঙ্কিং লকিং গেটওয়ে (Result টেবিলের সাথে শতভাগ সিঙ্ক)
    const newMark = await prisma.result.create({
      data: {
        subject: String(subject).trim(),
        cqMarks: cq,
        mcqMarks: mcq,
        pracMarks: prac,
        totalMarks: total,
        grade: grade,
        gpa: gpa,
        examTerm: cleanExamTerm,
        studentId: targetStudent.id // 🎯 এটিই সেই আসল কলাম যেখানে শিক্ষার্থীর UUID (id) বসবে, রোল নয়!
      }
    });

    return NextResponse.json({ success: true, mark: newMark });

  } catch (error: any) {
    console.error("🔴 MARKS SAVE ERROR:", error?.message);
    return NextResponse.json({ success: false, error: `সংরক্ষণ ব্যর্থ: ${error?.message}` }, { status: 500 });
  }
}
