import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function GET() {
  try {
    // ডাটাবেজ থেকে শুধুমাত্র সাধারণ শিক্ষকদের তালিকা (TEACHER) তুলে আনা হচ্ছে
    const teachers = await prisma.user.findMany({
      where: { role: 'TEACHER' },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, teachers });
  } catch (error: any) {
    return NextResponse.json({ error: 'তালিকা লোড করতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
