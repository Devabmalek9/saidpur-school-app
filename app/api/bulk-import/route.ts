import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { students } = body;
    
    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ success: false, error: '⚠️ এক্সেল ফাইলে কোনো শিক্ষার্থীর বৈধ ডাটা পাওয়া যায়নি।' }, { status: 400 });
    }

    let insertCount = 0;

    // 🎯 ডাটাবেজ ট্রানজেকশন সেফগার্ড: ডাটাবেজে ডুপ্লিকেট আইডি থাকলে তা আপডেট করবে, নতুন হলে তৈরি করবে (Upsert Mode)
    await prisma.$transaction(
      students.map((std: any) => {
        const cleanId = String(std.studentId || '').trim();
        const rollInt = parseInt(std.rollNo) || 1;
        const currentClass = String(std.class || 'ষষ্ঠ').trim();

        // আইডি বা নাম খালি থাকলে সেই রো স্কিপ করবে
        if (!cleanId || !std.name) return prisma.$executeRaw`SELECT 1`;

        insertCount++;
        return prisma.student.upsert({
          where: { studentId: cleanId },
          update: {
            name: String(std.name).trim(),
            class: currentClass,
            section: String(std.section || 'ক').trim(),
            rollNo: rollInt,
            parentPhone: String(std.parentPhone || '01700000000').trim()
          },
          create: {
            studentId: cleanId,
            name: String(std.name).trim(),
            class: currentClass,
            section: String(std.section || 'ক').trim(),
            rollNo: rollInt,
            parentPhone: String(std.parentPhone || '01700000000').trim()
          }
        });
      })
    );

    return NextResponse.json({ 
      success: true, 
      message: `🎉 মা-শা-আল্লাহ! এক্সেল শিট থেকে বিদ্যালয়ের বিভিন্ন শ্রেণীর মোট ${insertCount} জন চলমান (Running) শিক্ষার্থীর ডাটা এক ক্লিকে সফলভাবে ডাটাবেজে আপলোড হয়েছে।` 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `ইমপোর্ট ব্যর্থ হয়েছে: ${error?.message}` }, { status: 500 });
  }
}
