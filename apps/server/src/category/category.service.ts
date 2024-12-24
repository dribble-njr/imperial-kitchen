import { Injectable, ConflictException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, kitchenId } = createCategoryDto;
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name,
        kitchenId
      }
    });

    if (existingCategory) {
      throw new ConflictException(`Category '${name}' already exists in this kitchen`);
    }

    return this.prisma.category.create({
      data: createCategoryDto
    });
  }

  findAll(isActive: boolean = true) {
    return this.prisma.category.findMany({
      where: { isActive }
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    });
  }

  remove(id: number, isActive: boolean = true) {
    if (isActive) {
      return this.prisma.category.update({
        where: { id },
        data: { isActive: false }
      });
    }

    return this.prisma.category.delete({
      where: { id }
    });
  }

  restore(id: number) {
    return this.prisma.category.update({
      where: { id },
      data: { isActive: true }
    });
  }
}
