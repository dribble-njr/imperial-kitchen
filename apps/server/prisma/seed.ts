import { generateRandomCode, hashPassword } from '../src/util';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const kitchen = await tx.kitchen.create({
      data: {
        name: 'Admin Kitchen',
        inviteCode: generateRandomCode()
      }
    });

    const admin = await tx.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        name: 'Admin',
        password: await hashPassword('admin123'),
        kitchens: {
          create: {
            role: Role.ADMIN,
            kitchenId: kitchen.id
          }
        }
      }
    });

    console.log({ admin });
  });
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
