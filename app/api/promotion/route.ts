import { NextResponse } from 'next/server';
 import { prisma } from '../../lib/db';
export async function POST(request: Request) {
  try {
    // ১. ডাটাবেজ থেকে সকল বর্তমান শিক্ষার্থীকে নিয়ে আসা
    const allStudents = await prisma.student.findMany();

    // ২. রিলেশনাল ডাটাবেজ ট্রানজেকশন রুলস (এক ক্লিকে পুরো স্কুলের ক্লাস প্রমোশন মেকানিজম)
    await prisma.$transaction(async (tx) => {
      for (const student of allStudents) {
        let nextClass = '';

        // শ্রেণীর ক্রমানুযায়ী প্রমোশন লজিক ম্যাপ
        if (student.class === 'দশম') nextClass = 'Alumni'; // ১০ম শ্রেণী পাস করে বের হয়ে যাবে
        else if (student.class === 'নবম') nextClass = 'দশম';
        else if (student.class === 'অষ্টম') nextClass = 'নবম';
        else if (student.class === 'সপ্তম') nextClass = 'অষ্টম';
        else if (student.class === 'ষষ্ঠ') nextClass = 'সপ্তম';

        if (nextClass === 'Alumni') {
          // প্রাক্তন শিক্ষার্থীদের রেকর্ড ডিলিট বা আর্কাইভ করা
          await tx.student.delete({ where: { id: student.id } });
        } else if (nextClass) {
          // পরবর্তী শ্রেণীতে প্রমোশন এবং নতুন বছরের জন্য রোল সাময়িকভাবে আগেরটাই রাখা (পরবর্তীতে মেধা তালিকায় সিঙ্ক হবে)
          await tx.student.update({
            where: { id: student.id },
            data: { class: nextClass }
          });
        }
      }
    });

    return NextResponse.json({ success: true, message: '🚀 অভিনন্দন! পুরো বিদ্যালয়ের শিক্ষার্থীদের সফলভাবে পরবর্তী ক্লাসে প্রমোশন দেওয়া হয়েছে।' });
  } catch (error: any) {
    return NextResponse.json({ error: 'প্রমোশন প্রসেস করতে অভ্যন্তরীণ সমস্যা হয়েছে।' }, { status: 500 });
  }
}
