import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class DishService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDishDto: CreateDishDto) {
    return await this.prisma.dish.create({
      data: createDishDto
    });
  }

  async findAll(includeTrash: boolean = false) {
    return await this.prisma.dish.findMany({
      where: { isActive: !includeTrash }
    });
  }

  async findOne(id: number) {
    return await this.prisma.dish.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    return await this.prisma.dish.update({
      where: { id },
      data: updateDishDto
    });
  }

  async remove(id: number, permanent: boolean = false) {
    if (!permanent) {
      return await this.prisma.dish.update({
        where: { id },
        data: { isActive: false }
      });
    }

    return await this.prisma.dish.delete({
      where: { id }
    });
  }

  async restoreFromTrash(id: number) {
    return await this.prisma.dish.update({
      where: { id },
      data: { isActive: true }
    });
  }
}
