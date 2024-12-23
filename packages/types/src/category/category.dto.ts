import { CategoryType } from '@prisma/client';

export interface CreateCategoryDto {
  name: string;
  type: CategoryType;
  description?: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
