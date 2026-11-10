import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db'; // 🎯 উইন্ডোজ পাথ ডেডলক মুক্ত ২-স্তর গভীরতা পাথ ফিক্সড

export async function GET() {
  try {
    const db = prisma as any;
    let applicantsList: any[] = [];

    // 🎯 ইউনিভার্সাল রিড লক ফিক্স: ডাটাবেজ মডেল ও ক্যাশ জ্যাম ভেঙে সরাসরি মেমোরি থেকে ডাটা রিড করা
    if (db.applicant) {
      applicantsList = await db.applicant.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } else if (db.Applicant) {
      applicantsList = await db.Applicant.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } else {
      applicantsList = await prisma.applicant.findMany({
        orderBy: { id: 'desc' }
      });
    }

    // নেক্সট জেএস ফ্রন্টএন্ড যাতে সরাসরি এবং সুরক্ষিত উপায়ে এরে রিড করতে পারে
    return NextResponse.json({ 
      success: true, 
      applicants: applicantsList 
    });

  } catch (error: any) {
    console.error("🔴 ADMISSION LIST CRITICAL FETCH ERROR:", error?.message);
    return NextResponse.json({ 
      success: false, 
      applicants: [], 
      error: `ডাটা লোড এরর: ${error?.message || 'অভ্যন্তরীণ সমস্যা।'}` 
    }, { status: 500 });
  }
}
