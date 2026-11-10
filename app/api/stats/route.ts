import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Accumulate total financial collection values safely across rows
    const allFees = await prisma.feeCollection.findMany();
    const totalCollectedFund = allFees.reduce((acc, current) => acc + (current.amount || 0), 0);

    // 2. Count active structural rows from relational records
    const totalStudents = await prisma.student.count();
    const totalApplicants = await prisma.applicant.count();

    return NextResponse.json({
      success: true,
      totalCollectedFund,
      totalStudents,
      totalApplicants,
    });
  } catch (error: any) {
    console.error('Global Dashboard Statistics Error:', error);
    return NextResponse.json(
      { error: 'অভ্যন্তরীণ ডাটাবেজ পরিসংখ্যান সংগ্রহ ব্যর্থ হয়েছে।' },
      { status: 500 }
    );
  }
}
