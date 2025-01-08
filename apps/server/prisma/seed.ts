import { PrismaClient } from '@prisma/client';
import { createUser } from './seeds/user';
import { createCategory } from './seeds/category';
import { createDish } from './seeds/dish';

const prisma = new PrismaClient();

async function main() {
  await createUser(prisma);
  await createCategory(prisma);
  await createDish(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
