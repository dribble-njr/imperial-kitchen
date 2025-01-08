import { PrismaClient } from '@prisma/client';

export const createDish = async (prisma: PrismaClient) => {
  for (let i = 0; i < 10; i++) {
    await prisma.dish.create({
      data: {
        name: `Dish ${i}`,
        price: Math.floor(Math.random() * 100),
        kitchenId: 1,
        categoryId: 1
      }
    });
  }
};
