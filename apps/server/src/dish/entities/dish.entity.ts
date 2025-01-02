import { TagType } from '@prisma/client';

export class Dish {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  kitchenId: number;
  categoryId: number;
  tags: {
    tag: {
      id: number;
      name: string;
      type: TagType;
    };
  }[];
}
