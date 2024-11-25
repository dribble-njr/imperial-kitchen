import { TagType } from '@imperial-kitchen/types';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsString({ message: '标签名称必须是字符串' })
  @Length(1, 10, { message: '标签名称长度必须在1-10个字符之间' })
  name?: string;

  @IsOptional()
  @IsEnum(TagType, { message: '标签类型必须是 recipe 或 dish' })
  type?: TagType;
}
