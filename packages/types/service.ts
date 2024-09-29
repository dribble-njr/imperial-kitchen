export interface CommonResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}
