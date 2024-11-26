import { SseEventType } from '@imperial-kitchen/types';

import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PushSseEventDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  targetIds?: number[];

  @IsOptional()
  @IsEnum(SseEventType)
  type?: SseEventType;
}
