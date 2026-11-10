import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ডাটাবেজে একজন টেস্ট শিক্ষার্থীর প্রোফাইল এবং নম্বর তৈরি করা হচ্ছে
  await prisma.student.upsert({
    where: { studentId: '1025' },
    update: {},
    create: {
      studentId: '1025',
      name: 'সাকিব আল হাসান',
      class: 'দশম',
      section: 'ক',
      rollNo: 1,
      parentPhone: '01712345678',
      results: {
        create: [
          { subject: 'বাংলা', marks: 88, grade: 'A+', gpa: 5.00, examTerm: 'annual-2026' },
          { subject: 'ইংরেজি', marks: 82, grade: 'A+', gpa: 5.00, examTerm: 'annual-2026' },
          { subject: 'গণিত', marks: 95, grade: 'A+', gpa: 5.00, examTerm: 'annual-2026' },
        ],
      },
    },
  });
  console.log('ডাটাবেজে টেস্ট ডাটা সফলভাবে আপলোড হয়েছে!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
