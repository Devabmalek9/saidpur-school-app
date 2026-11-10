import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'নোটিশ আইডি প্রদান করা বাধ্যতামূলক।' }, { status: 400 });
    }

    // ডাটাবেজ থেকে নোটিশটি মুছে ফেলা
    await prisma.notice.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true, message: '🎉 নোটিশটি সফলভাবে ডাটাবেজ থেকে ডিলিট করা হয়েছে!' });
  } catch (error: any) {
    return NextResponse.json({ error: 'নোটিশ ডিলিট করতে অভ্যন্তরীণ সমস্যা হয়েছে।' }, { status: 500 });
  }
}
