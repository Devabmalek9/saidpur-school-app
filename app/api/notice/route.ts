import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// 🔍 ১. ডাটাবেজ থেকে সকল নোটিশ তুলে আনা (GET Request - হোম পেজের জন্য)
export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' } // নতুন নোটিশ সবার ওপরে থাকবে
    });
    return NextResponse.json({ success: true, notices });
  } catch (error) {
    return NextResponse.json({ error: 'নোটিশ লোড করতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}

// 💾 ২. নতুন নোটিশ ডাটাবেজে সেভ করা (POST Request - অ্যাডমিন প্যানেলের জন্য)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'সকল তথ্য প্রদান করা বাধ্যতামূলক।' }, { status: 400 });
    }

    // আজকের বাংলা তারিখ ফরম্যাট (উদাঃ 29/10/2026)
    const today = new Date().toLocaleDateString('bn-BD');

    const newNotice = await prisma.notice.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category,
        date: today
      }
    });

    return NextResponse.json({ success: true, notice: newNotice });
  } catch (error) {
    return NextResponse.json({ error: 'নোটিশটি ডাটাবেজে সংরক্ষণ করা যায়নি।' }, { status: 500 });
  }
}
