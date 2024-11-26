export enum SSEEventType {
  MESSAGE = 'message'
}

export interface SSEEventData {
  message: string;
}
