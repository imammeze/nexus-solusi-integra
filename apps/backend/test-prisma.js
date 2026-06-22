const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dateStr = '2026-06-25';
  const date = new Date(dateStr);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  console.log('Querying from', startOfDay.toISOString(), 'to', endOfDay.toISOString());

  const records = await prisma.consultation.findMany({
    where: {
      consultDate: date
    }
  });

  console.log('Found:', records);
}

main().finally(() => prisma.$disconnect());
