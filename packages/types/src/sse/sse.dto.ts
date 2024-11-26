import { SseEventType } from './sse.vo';

export interface PushSseEventDTO {
  message: string;
  targetIds?: number[];
  type?: SseEventType;
}
