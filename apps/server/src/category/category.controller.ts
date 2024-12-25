import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('trash')
  findTrashCategories() {
    return this.categoryService.findAll(false);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(Number(id), updateCategoryDto);
  }

  @Delete(':id')
  moveToTrash(@Param('id') id: string) {
    return this.categoryService.moveToTrash(+id);
  }

  @Delete('trash/:id')
  permanentDelete(@Param('id') id: string) {
    return this.categoryService.moveToTrash(+id, true);
  }

  @Patch('trash/:id/restore')
  restoreFromTrash(@Param('id') id: string) {
    return this.categoryService.restoreFromTrash(+id);
  }
}
