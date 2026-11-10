import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// 🔍 ১. ডাটাবেজ থেকে বার্তার তালিকা দেখা (অ্যাডমিন প্যানেলের জন্য)
export async function GET() {
  try {
    const messages = await (prisma as any).contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ error: 'বার্তা লোড করতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}

// 💾 ২. যোগাযোগ পেজের ফরমের বার্তা ডাটাবেজে সংরক্ষণ করা
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: '⚠️ নাম, ইমেইল এবং বার্তা লেখা বাধ্যতামূলক।' }, { status: 400 });
    }

    const newMessage = await (prisma as any).contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : "সাধারণ জিজ্ঞাসা",
        message: message.trim()
      }
    });

    return NextResponse.json({ success: true, message: '🎉 আপনার বার্তাটি সফলভাবে প্রধান শিক্ষকের দপ্তরে পাঠানো হয়েছে!' });
  } catch (error) {
    return NextResponse.json({ error: 'বার্তা সার্ভারে পাঠাতে সমস্যা হয়েছে।' }, { status: 500 });
  }
}
