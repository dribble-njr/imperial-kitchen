import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  kitchenId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
