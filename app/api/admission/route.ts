import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      nameBn, nameEn, birthReg, 
      fatherNameBn, fatherNameEn, fatherNid, 
      motherNameBn, motherNameEn, motherNid, 
      className, phone, address, photo 
    } = body;

    if (!nameBn || !birthReg || !phone || !photo) {
      return NextResponse.json({ success: false, error: '⚠️ শিক্ষার্থীর নাম, জন্ম নিবন্ধন, মোবাইল নম্বর এবং ছবি প্রদান করা বাধ্যতামূলক।' }, { status: 400 });
    }

    const db = prisma as any;

    const applicantPayload: any = {
      name: String(nameBn).trim(),
      fatherName: String(fatherNameBn || '').trim(),
      motherName: String(motherNameBn || '').trim(),
      className: String(className || 'ষষ্ঠ').trim(),
      phone: String(phone).trim(),
      status: 'PENDING',
      
      nameBn: String(nameBn).trim(),
      nameEn: String(nameEn || '').trim().toUpperCase(),
      birthReg: String(birthReg).trim(),
      fatherNameBn: String(fatherNameBn || '').trim(),
      fatherNameEn: String(fatherNameEn || '').trim(),
      fatherNid: String(fatherNid || '').trim(),
      motherNameBn: String(motherNameBn || '').trim(),
      motherNameEn: String(motherNameEn || '').trim(),
      motherNid: String(motherNid || '').trim(),
      address: String(address || '').trim(),
      photo: String(photo)
    };

    const newApplicant = await db.applicant.create({
      data: applicantPayload
    });

    // 🎯 ফিক্সড রেসপন্স: ফ্রন্টএন্ড যেন সরাসরি 'success: true' এবং মূল ডাটা একযোগে রিড করতে পারে
    return NextResponse.json({ 
      success: true, 
      id: newApplicant.id,
      name: newApplicant.name,
      phone: newApplicant.phone,
      ...newApplicant 
    });

  } catch (error: any) {
    console.error("🔴 DATABASE CRITICAL ERROR:", error?.message);
    return NextResponse.json({ 
      success: false, 
      error: `ডাটাবেজ এরর: ${error?.message || 'অভ্যন্তরীণ সমস্যা।'}` 
    }, { status: 500 });
  }
}
