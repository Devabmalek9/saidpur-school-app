import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, name, username, newPassword } = body;

    if (!phone) {
      return NextResponse.json({ error: 'মোবাইল নম্বর প্রদান করা বাধ্যতামূলক।' }, { status: 400 });
    }

    const cleanPhone = phone.trim();

    // 🔍 ১. নাম বাদ দিয়ে শুধুমাত্র মোবাইল নম্বর দিয়ে ডাটাবেজে শিক্ষককে খুঁজে বের করা (সবচেয়ে সহজ ও সেফ)
    const user = await prisma.user.findFirst({
      where: {
        phone: cleanPhone
      }
    });

    // 💡 ফলব্যাক লজিক: যদি মোবাইল নম্বর কলাম ম্যাপ না হয়, তবে ইউজারনেম দিয়ে খুঁজে বের করা
    const targetUser = user || await prisma.user.findFirst({
      where: {
        username: username ? username.trim().toLowerCase() : undefined
      }
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'প্রদত্ত মোবাইল নম্বর বা আইডি অনুযায়ী কোনো শিক্ষক অ্যাকাউন্ট ডাটাবেজে পাওয়া যায়নি।' }, { status: 404 });
    }

    // 📋 ২. অ্যাকশন ১: ইউজার আইডি পুনরুদ্ধার করা (Recover Username)
    if (action === 'RECOVER_ID') {
      return NextResponse.json({ 
        success: true, 
        message: `🎉 ডাটাবেজ ম্যাচিং সফল! আপনার অ্যাকাউন্টের ইউজার আইডি (Username) হলো: "${targetUser.username}"` 
      });
    }

    // 🔐 ৩. অ্যাকশন ২: পাসওয়ার্ড রিসেট করা (Reset Password)
    if (action === 'RESET_PASSWORD') {
      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ error: 'নতুন পাসওয়ার্ডটি নূন্যতম ৪ ডিজিটের হতে হবে।' }, { status: 400 });
      }

      // ডাটাবেজে নতুন পাসওয়ার্ড সরাসরি আপডেট করা হচ্ছে
      await prisma.user.update({
        where: { id: targetUser.id },
        data: { password: newPassword.trim() }
      });

      return NextResponse.json({ 
        success: true, 
        message: '🎉 আপনার অ্যাকাউন্টের পাসওয়ার্ডটি সফলভাবে রিসেট হয়েছে! এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।' 
      });
    }

    return NextResponse.json({ error: 'ভুল রিকোয়েস্ট মেথড।' }, { status: 400 });

  } catch (error: any) {
    console.error("Recovery Engine Crash:", error.message);
    return NextResponse.json({ error: 'অ্যাকাউন্ট রিকভার করতে অভ্যন্তরীণ সমস্যা হয়েছে।' }, { status: 500 });
  }
}
