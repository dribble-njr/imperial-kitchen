import { DishVO } from '../dish/dish.vo';
import { CategoryType } from '@prisma/client';

export interface CategoryVO {
  id: number;
  name: string;
  type: CategoryType;
  description?: string;
  dishes?: DishVO[];
}
