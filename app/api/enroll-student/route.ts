import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { applicantId, studentId, rollNo, section } = body;

    if (!applicantId || !studentId || !rollNo || !section) {
      return NextResponse.json({ success: false, error: '⚠️ সব তথ্য প্রদান করা বাধ্যতামূলক।' }, { status: 400 });
    }

    const applicantDoc = await prisma.applicant.findUnique({ where: { id: applicantId } });
    if (!applicantDoc) return NextResponse.json({ success: false, error: '⚠️ আবেদনকারী মেলেনি।' }, { status: 404 });

    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const cleanStudentId = String(studentId).trim().replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)));
    const cleanRollNo = parseInt(String(rollNo).trim().replace(/[০-৯]/g, (match) => String(banglaNumbers.indexOf(match)))) || 1;

    // 🎯 ডাটাবেজের নতুন 'photo' কলামে সরাসরি ছবি সেভ করা হচ্ছে
    const newStudent = await prisma.student.create({
      data: {
        studentId: cleanStudentId,
        name: applicantDoc.nameBn || applicantDoc.name,
        class: applicantDoc.className,
        section: String(section).trim(),
        rollNo: cleanRollNo,
        parentPhone: applicantDoc.phone,
        photo: applicantDoc.photo || null, // 🎯 ছবি এখন স্থায়ীভাবে সেভ হবে
        meritPosition: 'N/A',
        character: 'উত্তম'
      }
    });

    await prisma.applicant.update({ where: { id: applicantId }, data: { status: 'APPROVED' } });
    return NextResponse.json({ success: true, student: newStudent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
