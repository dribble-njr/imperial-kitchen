export interface CommonResponse<T = unknown> {
  statusCode: number;
  message: string | string[];
  data?: T;
  error?: string;
}
