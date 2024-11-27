import { TagType } from '@imperial-kitchen/types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExcludeTimestamps } from 'src/common/decorator/exclude-timestamps.decorator';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ExcludeTimestamps()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get('type/:type')
  findByType(@Param('type') type: TagType) {
    return this.tagService.findByType(type);
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.tagService.search(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }

  @Post('batch')
  createMany(@Body() tags: CreateTagDto[]) {
    return this.tagService.createMany(tags);
  }
}
