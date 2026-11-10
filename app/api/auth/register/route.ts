import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, password, phone } = body;

    if (!name || !username || !password || !phone) {
      return NextResponse.json({ error: 'অনুগ্রহ করে সকল তথ্য প্রদান করুন।' }, { status: 400 });
    }

    const cleanUser = username.trim().toLowerCase();

    // ১. ইউজারনেমটি আগে থেকেই ডাটাবেজে আছে কিনা তা চেক করা
    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUser }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'এই ইউজারনেমটি ইতিমধ্যে ব্যবহৃত হয়েছে! অন্য একটি চেষ্টা করুন।' }, { status: 400 });
    }

    // ২. নতুন শিক্ষক অ্যাকাউন্টটি ডিফল্ট "TEACHER" রোল এবং "isApproved: false" (পেন্ডিং) অবস্থায় সেভ করা
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        username: cleanUser,
        password: password, // টেস্ট প্রজেক্ট বিধায় প্লেইন টেক্সট (প্রোডাকশনে হ্যাস করা উচিত)
        role: 'TEACHER',
        isApproved: false // প্রধান শিক্ষকের অনুমোদনের জন্য ডিফল্ট পেন্ডিং
      }
    });

    return NextResponse.json({ success: true, message: 'নিবন্ধন সফল হয়েছে! প্রধান শিক্ষকের অনুমোদনের জন্য অপেক্ষা করুন।' });

  } catch (error: any) {
    console.error("Register Error:", error.message);
    return NextResponse.json({ error: 'নিবন্ধন করতে অভ্যন্তরীণ সমস্যা হয়েছে।' }, { status: 500 });
  }
}
