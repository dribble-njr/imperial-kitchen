export interface CommonResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}
