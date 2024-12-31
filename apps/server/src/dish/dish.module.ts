import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';

@Module({
  controllers: [DishController],
  providers: [DishService]
})
export class DishModule {}
