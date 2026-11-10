import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'প্রয়োজনীয় ডাটা মিসিং রয়েছে।' }, { status: 400 });
    }

    // 🎯 PostgreSQL ডাটাবেজের Applicant টেবিলে স্ট্যাটাস আপডেট করা (Approved / Rejected)
    const updatedApplicant = await prisma.applicant.update({
      where: { id: id },
      data: { status: status }
    });

    return NextResponse.json({ success: true, data: updatedApplicant });
  } catch (error: any) {
    console.error("Status Update Error:", error.message);
    return NextResponse.json({ error: 'ডাটাবেজে স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
