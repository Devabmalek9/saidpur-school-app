import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dataObj = body.payload || body;
    const { action, id, studentId, examTerm, userId, status, title, content, category, date, feeType, amount, monthName, collectedBy, nextClass, studentName, class: className } = dataObj;

    if (action === 'FETCH_STUDENT_RESULTS') {
      const cleanId = String(studentId || '').trim();
      const cleanTerm = String(examTerm || '').trim().toUpperCase();
      if (!cleanId) return NextResponse.json({ success: false, error: 'আইডি আবশ্যক।' }, { status: 400 });
      const studentProfile = await prisma.student.findFirst({ where: { OR: [{ studentId: cleanId }, { id: cleanId }] } });
      if (!studentProfile) return NextResponse.json({ success: false, error: '⚠️ প্রোফাইল খুঁজে পাওয়া যায়নি।' });
      const markRecords = await prisma.result.findMany({ where: { studentId: studentProfile.id, examTerm: cleanTerm }, orderBy: { subject: 'asc' } });
      return NextResponse.json({ success: true, student: studentProfile, results: markRecords });
    }

    if (action === 'MANAGE_TEACHER') {
      if (!userId) return NextResponse.json({ success: false, error: 'ইউজার আইডি আবশ্যক।' }, { status: 400 });
      if (status === 'DELETE') { await prisma.user.delete({ where: { id: userId } }); return NextResponse.json({ success: true, message: '🗑️ অ্যাকাউন্টটি স্থায়ীভাবে মুছে ফেলা হয়েছে!' }); }
      await prisma.user.update({ where: { id: userId }, data: { isApproved: status === 'APPROVE' } });
      return NextResponse.json({ success: true, message: status === 'APPROVE' ? '✅ অ্যাকাউন্টটি সফলভাবে অনুমোদন করা হয়েছে!' : '❌ অ্যাকাউন্টটি বাতিল করা হয়েছে!' });
    }

    if (action === 'CREATE_NOTICE') {
      const newNotice = await prisma.notice.create({ data: { title: String(title).trim(), content: String(content).trim(), category: String(category), date: String(date) } });
      return NextResponse.json({ success: true, message: '📢 নোটিশটি বোর্ডে লাইভ করা হয়েছে!', notice: newNotice });
    }

    if (action === 'COLLECT_FEE') {
      const newFee = await prisma.feeCollection.create({
        data: { studentId: String(studentId).trim(), studentName: String(studentName || 'নিয়মিত শিক্ষার্থী'), class: String(className || 'দশম'), feeType: String(feeType), amount: parseFloat(amount) || 0, monthName: String(monthName), date: String(date), collectedBy: String(collectedBy) }
      });
      return NextResponse.json({ success: true, message: '💰 ফি আদায় ট্রানজেকশন সফল হয়েছে!', fee: newFee });
    }

    if (action === 'DELETE_FEE_LOG') {
      const targetId = String(id || dataObj.id || '').trim();
      if (!targetId) return NextResponse.json({ success: false, error: '⚠️ ট্রানজেকশন আইডি পাওয়া যায়নি।' }, { status: 400 });
      await prisma.feeCollection.delete({ where: { id: targetId } });
      return NextResponse.json({ success: true, message: '🗑️ ভুল ফি ট্রানজেকশনটি ডাটাবেজ থেকে স্থায়ীভাবে মুছে ফেলা হয়েছে!' });
    }

    if (action === 'FETCH_FEE_LOGS') {
      const logs = await prisma.feeCollection.findMany({ orderBy: { createdAt: 'desc' }, take: 30 });
      return NextResponse.json({ success: true, feeCollections: logs });
    }

    // 🎯 ১. একক শিক্ষার্থী প্রমোশন ইঞ্জিন
    if (action === 'PROMOTE_STUDENT') {
      await prisma.student.updateMany({
        where: { studentId: String(studentId).trim() },
        data: { class: nextClass }
      });
      return NextResponse.json({ success: true, message: '📊 শিক্ষার্থীকে সফলভাবে প্রমোশন দেওয়া হয়েছে!' });
    }

    // 🎯 🚀 ২. [মেগা বাল্ক প্রমোশন ইঞ্জিন]: এক ক্লিকে পুরো স্কুলের পাস প্রমোশন ও ১০ম শ্রেণী বের করার কাস্টম কোড
    if (action === 'BULK_AUTO_PROMOTION') {
      await prisma.$transaction(async (tx) => {
        // ক. ১০ম শ্রেণীর শিক্ষার্থীদের গ্র্যাজুয়েশন সম্পন্ন করে ডাটাবেজ থেকে আউট (Alumni/SSC_PASSED) করা
        await tx.student.updateMany({
          where: { class: 'দশম' },
          data: { class: 'SSC_PASSED' }
        });

        // খ. নবম শ্রেণীর শিক্ষার্থীদের দশম শ্রেণীতে প্রমোশন
        await tx.student.updateMany({
          where: { class: 'নবম' },
          data: { class: 'দশম' }
        });

        // গ. অষ্টম শ্রেণীর শিক্ষার্থীদের নবম শ্রেণীতে প্রমোশন
        await tx.student.updateMany({
          where: { class: 'অষ্টম' },
          data: { class: 'নবম' }
        });

        // ঘ. সপ্তম শ্রেণীর শিক্ষার্থীদের অষ্টম শ্রেণীতে প্রমোশন
        await tx.student.updateMany({
          where: { class: 'সপ্তম' },
          data: { class: 'অষ্টম' }
        });

        // ঙ. ষষ্ঠ শ্রেণীর শিক্ষার্থীদের সপ্তম শ্রেণীতে প্রমোশন
        await tx.student.updateMany({
          where: { class: 'ষষ্ঠ' },
          data: { class: 'সপ্তম' }
        });
      });

      return NextResponse.json({ success: true, message: '🎉 মা-শা-আল্লাহ! বিদ্যালয়ের সকল শ্রেণীর শিক্ষার্থীদের এক ক্লিকে সফলভাবে অটো-প্রমোশন সম্পন্ন হয়েছে এবং ১০ম শ্রেণী সাকসেসফুলি বের হয়ে গেছে।' });
    }

    if (action === 'REMOVE_STUDENT') {
      const cleanSid = String(studentId || '').trim();
      await prisma.$transaction(async (tx) => { await tx.feeCollection.deleteMany({ where: { studentId: cleanSid } }); await tx.student.deleteMany({ where: { studentId: cleanSid } }); });
      return NextResponse.json({ success: true, message: '🚀 শিক্ষার্থীর সম্পূর্ণ ডাটা মুছে ফেলা হয়েছে!' });
    }

    if (action === 'DELETE_MESSAGE') {
      await prisma.contactMessage.delete({ where: { id: id } });
      return NextResponse.json({ success: true, message: '🎉 বার্তা সফলভাবে ডিলিট হয়েছে!' });
    }

    return NextResponse.json({ error: 'অবৈধ প্রশাসনিক রিকোয়েস্ট।' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: `অপারেশন ব্যর্থ: ${error?.message}` }, { status: 500 });
  }
}
