import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagType } from '@imperial-kitchen/types';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  // 创建标签
  async create(createTagDto: CreateTagDto) {
    // 先检查是否存在相同的标签
    const existingTag = await this.prisma.tag.findFirst({
      where: {
        AND: [{ name: createTagDto.name }, { type: createTagDto.type }]
      }
    });

    // 如果存在相同标签，抛出冲突异常
    if (existingTag) {
      throw new ConflictException(`tag '${createTagDto.name}' in '${createTagDto.type}' type already exists`);
    }

    // 不存在相同标签时创建新标签
    return this.prisma.tag.create({
      data: createTagDto
    });
  }

  // 查找所有标签
  async findAll() {
    return this.prisma.tag.findMany();
  }

  // 根据类型查找标签
  async findByType(type: TagType) {
    return this.prisma.tag.findMany({
      where: { type }
    });
  }

  // 查找单个标签
  async findOne(id: number) {
    return this.prisma.tag.findUnique({
      where: { id }
    });
  }

  // 更新标签
  async update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto
    });
  }

  // 删除标签
  async remove(id: number) {
    return this.prisma.tag.delete({
      where: { id }
    });
  }

  // 搜索标签
  async search(keyword: string) {
    return this.prisma.tag.findMany({
      where: {
        name: {
          contains: keyword
        }
      }
    });
  }

  // 批量创建标签
  async createMany(tags: CreateTagDto[]) {
    return this.prisma.tag.createMany({
      data: tags
    });
  }
}
