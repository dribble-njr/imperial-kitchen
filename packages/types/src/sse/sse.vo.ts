export enum SseEventType {
  MESSAGE = 'message'
}

export interface SseEventData {
  message: string;
}
