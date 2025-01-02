import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';

export class UpdateDishDto extends PartialType(CreateDishDto) {}
