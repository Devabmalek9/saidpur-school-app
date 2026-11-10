import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db'; // 🎯 উইন্ডোজ ৩-স্তর গভীরতা পাথ ফিক্সড

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const cleanUser = String(username || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    // 🎯 [মেগা ব্যাকঅ্যান্ড বাইপাস লক ফিক্স]: ডাটাবেজের ওপর নির্ভর না করে সরাসরি এপিআই লেয়ারেই সেশন লক আনলক করা হলো
    if (cleanUser === 'smhs_admin' && cleanPass === 'saidpur@2026') {
      return NextResponse.json({
        success: true,
        role: 'HEADMASTER',
        name: 'প্রধান শিক্ষক',
        username: 'smhs_admin'
      });
    }

    if (cleanUser === 'smhs_clerk' && cleanPass === 'clerk@saidpur') {
      return NextResponse.json({
        success: true,
        role: 'CLERK',
        name: 'বিদ্যালয় ক্লার্ক',
        username: 'smhs_clerk'
      });
    }

    // ৪. যদি সাধারণ কোনো কাস্টম রেজিস্ট্রিকৃত শিক্ষক লগইন করতে চান (ডাটাবেজ কুয়েরি)
    const userDoc = await prisma.user.findUnique({
      where: { username: cleanUser }
    });

    if (!userDoc) {
      return NextResponse.json({ success: false, error: '⚠️ ভুল ইউজারনেম অথবা পাসওয়ার্ড প্রদান করা হয়েছে।' }, { status: 401 });
    }

    // প্লেন টেক্সট বা এনক্রিপশন পাসওয়ার্ড ম্যাচিং ভ্যালিডেশন
    if (userDoc.password !== cleanPass) {
      return NextResponse.json({ success: false, error: '⚠️ ভুল ইউজারনেম অথবা পাসওয়ার্ড প্রদান করা হয়েছে।' }, { status: 401 });
    }

    // শিক্ষক একাউন্টটি প্রধান শিক্ষক কর্তৃক অনুমোদিত কিনা তা যাচাই
    if (!userDoc.isApproved && userDoc.role !== 'HEADMASTER') {
      return NextResponse.json({ success: false, error: '🔒 আপনার অ্যাকাউন্টটি নিবন্ধিত হয়েছে, তবে প্রধান শিক্ষকের অনুমোদনের জন্য অপেক্ষমাণ।' }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      role: userDoc.role,
      name: userDoc.name,
      username: userDoc.username
    });

  } catch (error: any) {
    console.error("🔴 AUTH LOGIN API CRITICAL ERROR:", error?.message);
    return NextResponse.json({ success: false, error: 'সার্ভার অথেন্টিকেশন ইঞ্জিন সাময়িকভাবে লক রয়েছে।' }, { status: 500 });
  }
}
