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

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
