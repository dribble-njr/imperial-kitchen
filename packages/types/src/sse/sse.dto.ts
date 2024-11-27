import { SSEEventType } from './sse.vo';

export interface PushSSEEventDTO {
  message: string;
  targetIds?: number[];
  type?: SSEEventType;
}
