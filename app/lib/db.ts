import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// ডুপ্লিকেট কানেকশন জট এড়াতে গ্লোবাল ইন্সট্যান্স চেকিং
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'], // শুধুমাত্র এরর ট্র্যাকিং লগ সচল রাখা হলো
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
