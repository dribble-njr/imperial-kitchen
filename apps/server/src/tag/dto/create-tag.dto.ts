import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TagType } from '@prisma/client';

export class CreateTagDto {
  @IsNotEmpty({ message: '标签名称不能为空' })
  @IsString({ message: '标签名称必须是字符串' })
  @Length(1, 10, { message: '标签名称长度必须在1-10个字符之间' })
  name: string;

  @IsNotEmpty({ message: '标签类型不能为空' })
  @IsEnum(TagType, { message: '标签类型必须是 recipe 或 dish' })
  type: TagType;
}
