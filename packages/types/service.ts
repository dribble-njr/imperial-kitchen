export interface Response<T = unknown> {
  code: number;
  message: string;
  data: T;
}
