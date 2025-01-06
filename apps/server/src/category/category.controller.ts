import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
    return this.categoryService.findAll(true);
  }

  @Get(':id/dishes')
  findDishesByCategory(@Param('id') id: string, @Query('offset') offset: string, @Query('limit') limit: string) {
    return this.categoryService.findDishesByCategory(+id, +offset, +limit);
  }

  @Get(':id/dishes/trash')
  findTrashDishesByCategory(@Param('id') id: string, @Query('offset') offset: string, @Query('limit') limit: string) {
    return this.categoryService.findDishesByCategory(+id, +offset, +limit, true);
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
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Delete(':id/trash')
  permanentRemove(@Param('id') id: string) {
    return this.categoryService.remove(+id, true);
  }

  @Patch(':id/trash/restore')
  restoreFromTrash(@Param('id') id: string) {
    return this.categoryService.restoreFromTrash(+id);
  }
}
