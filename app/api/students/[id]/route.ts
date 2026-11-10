import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: any }
) {
  try {
    const resolvedParams = await context.params;
    const rawStudentId = resolvedParams?.id;

    if (!rawStudentId || rawStudentId.trim() === '') {
      return NextResponse.json(
        { error: '❌ শিক্ষার্থী আইডি প্রদান করা আবশ্যক।' },
        { status: 400 }
      );
    }

    const cleanStudentId = rawStudentId.trim();
    // আইডিটি নাম্বার কি না তা যাচাই করা এবং নাম্বারে রূপান্তর করা
    const numericStudentId = parseInt(cleanStudentId, 10);
    const isNumber = !isNaN(numericStudentId);

    // ==========================================
    // লেয়ার ১: মূল Student টেবিল অনুসন্ধান
    // ==========================================
    
    // কন্ডিশন ক) যদি আইডি স্ট্রিং হিসেবে থাকে
    let student = await prisma.student.findFirst({
      where: { id: cleanStudentId }
    });

    // কন্ডিশন খ) ফলব্যাক: যদি আইডি স্কিমাতে Int (নাম্বার) হিসেবে থাকে
    if (!student && isNumber) {
      student = await prisma.student.findFirst({
        where: { id: numericStudentId as any }
      });
    }

    // কন্ডিশন গ) ফলব্যাক: যদি টেবিলের কলামের নাম 'id' না হয়ে 'studentId' হয়
    if (!student) {
      student = await prisma.student.findFirst({
        where: { 
          OR: [
            { studentId: cleanStudentId },
            ...(isNumber ? [{ studentId: numericStudentId as any }] : [])
          ]
        } as any
      });
    }

    if (student) {
      return NextResponse.json({
        success: true,
        name: (student as any).name,
        class: (student as any).class,
      });
    }

    // ==========================================
    // লেয়ার ২: ফলব্যাক - Applicant (আবেদন) টেবিল অনুসন্ধান
    // ==========================================
    let applicant = await prisma.applicant.findFirst({
      where: { id: cleanStudentId }
    });

    if (!applicant && isNumber) {
      applicant = await prisma.applicant.findFirst({
        where: { id: numericStudentId as any }
      });
    }

    if (applicant) {
      return NextResponse.json({
        success: true,
        name: (applicant as any).name,
        class: (applicant as any).class || 'ভর্তিচ্ছুক',
      });
    }

    // ৪. বিদ্যালয়ের সকল রিলেশনাল টেবিলে খোঁজার পরও যদি ডাটা না মেলে
    return NextResponse.json(
      { error: '❌ এই আইডি দিয়ে সৈয়দপুর মুসলিম হাই স্কুলের ডাটাবেজে কোনো প্রোফাইল পাওয়া যায়নি।' },
      { status: 404 }
    );

  } catch (error: any) {
    console.error('Final Core Search Failure:', error);
    return NextResponse.json(
      { error: 'সার্ভারে অভ্যন্তরীণ ডাটাবেজ মডেল বা টাইপ অমিল সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}
