import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export const dynamic = 'force-dynamic';

type CollectedItem = {
  feeType?: unknown;
  amount?: unknown;
  monthName?: unknown;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId')?.trim();

    if (studentId) {
      const history = await prisma.feeCollection.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, history });
    }

    const result = await prisma.feeCollection.aggregate({
      _sum: { amount: true },
    });

    return NextResponse.json({
      success: true,
      totalCollected: result._sum.amount ?? 0,
    });
  } catch (error) {
    console.error('Fees GET Error:', error);

    return NextResponse.json(
      { error: 'অর্থনৈতিক ডাটা লোড করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const studentId =
      typeof body?.studentId === 'string' ||
      typeof body?.studentId === 'number'
        ? String(body.studentId).trim()
        : '';

    const collectedItems: CollectedItem[] = Array.isArray(body?.collectedItems)
      ? body.collectedItems
      : [];

    if (!studentId || collectedItems.length === 0) {
      return NextResponse.json(
        {
          error:
            'শিক্ষার্থী আইডি এবং অন্তত একটি ফি খাতের তথ্য দিতে হবে।',
        },
        { status: 400 }
      );
    }

    // Student.id হলো UUID এবং Student.studentId হলো রোল/ইউনিক আইডি।
    const student = await prisma.student.findFirst({
      where: {
        OR: [{ id: studentId }, { studentId }],
      },
    });

    let targetName: string;
    let targetClass: string;

    if (student) {
      targetName = student.name;
      targetClass = student.class;
    } else {
      // Applicant মডেলে studentId নেই; Applicant.id হলো UUID।
      const applicant = await prisma.applicant.findUnique({
        where: { id: studentId },
      });

      if (!applicant) {
        return NextResponse.json(
          { error: 'এই আইডি দিয়ে কোনো শিক্ষার্থী বা আবেদনকারী পাওয়া যায়নি।' },
          { status: 404 }
        );
      }

      targetName = applicant.name;
      targetClass = applicant.className;
    }

    const validItems = collectedItems
      .map((item) => {
        const amount = Number(item?.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
          return null;
        }

        return {
          feeType:
            typeof item?.feeType === 'string' && item.feeType.trim()
              ? item.feeType.trim().toUpperCase()
              : 'MULTIPLE_FEES',
          amount,
          monthName:
            typeof item?.monthName === 'string' && item.monthName.trim()
              ? item.monthName.trim()
              : 'N/A',
        };
      })
      .filter((item) => item !== null);

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: 'টাকার পরিমাণ শূন্যের বেশি বৈধ সংখ্যা হতে হবে।' },
        { status: 400 }
      );
    }

    const today = new Date().toLocaleDateString('bn-BD');

    const createdReceipts = await prisma.$transaction(
      validItems.map((item) =>
        prisma.feeCollection.create({
          data: {
            studentId,
            studentName: targetName,
            class: targetClass,
            feeType: item.feeType,
            amount: item.amount,
            monthName: item.monthName,
            date: today,
            collectedBy: 'CLERK',
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      receipts: {
        studentId,
        studentName: targetName,
        class: targetClass,
        date: today,
        map: createdReceipts,
      },
    });
  } catch (error) {
    console.error('Fees POST Error:', error);

    return NextResponse.json(
      { error: 'ফি ডাটাবেজে সংরক্ষণ করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}