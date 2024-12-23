import { CategoryType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: CategoryType;

  description?: string;
}
