import { SSEEventType } from '@imperial-kitchen/types';

import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PushSSEEventDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  targetIds?: number[];

  @IsOptional()
  @IsEnum(SSEEventType)
  type?: SSEEventType;
}
