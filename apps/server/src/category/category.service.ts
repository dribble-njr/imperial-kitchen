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

    return await this.prisma.category.create({
      data: createCategoryDto
    });
  }

  async findAll(includeTrash: boolean = false) {
    return await this.prisma.category.findMany({
      where: { isActive: !includeTrash }
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where: { id }
    });
  }

  async findDishesByCategory(id: number, includeTrash: boolean = false) {
    return await this.prisma.dish.findMany({
      where: { categoryId: id, isActive: !includeTrash }
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    });
  }

  async remove(id: number, permanent: boolean = false) {
    if (!permanent) {
      return await this.prisma.category.update({
        where: { id },
        data: { isActive: false }
      });
    }

    return await this.prisma.category.delete({
      where: { id }
    });
  }

  async restoreFromTrash(id: number) {
    return await this.prisma.category.update({
      where: { id },
      data: { isActive: true }
    });
  }
}
