import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, isApproved } = body;

    // প্রধান শিক্ষক মহোদয়ের অ্যাকশন অনুযায়ী ডাটাবেজে শিক্ষক সচল বা অচল করা
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { isApproved: isApproved }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: 'অনুমোদন প্রসেস করতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
