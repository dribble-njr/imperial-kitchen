import { PrismaClient } from '@prisma/client';

export const createCategory = async (prisma: PrismaClient) => {
  for (let i = 0; i < 10; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
        kitchenId: 1
      }
    });
  }
};
