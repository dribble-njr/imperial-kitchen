import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SSEEventType {
  MESSAGE = 'message'
}

export interface SSEEventData {
  message: string;
}

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
