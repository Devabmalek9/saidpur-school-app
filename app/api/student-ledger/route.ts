import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cleanId = String(body.studentId || '').trim();

    if (!cleanId) {
      return NextResponse.json({ success: false, error: 'শিক্ষার্থী আইডি আবশ্যক।' }, { status: 400 });
    }

    const ledgerHistory = await prisma.feeCollection.findMany({
      where: { studentId: cleanId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, history: ledgerHistory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: `সার্ভার ডাটা ট্র্যাকিং এরর: ${error?.message}` }, { status: 500 });
  }
}
