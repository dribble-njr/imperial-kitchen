import { ERROR_CODES } from '@imperial-kitchen/types';

export class AppError extends Error {
  public code: number;
  public data: unknown;

  constructor(message: ERROR_CODES, code: number = 500, data: unknown = null) {
    super(message);
    this.code = code;
    this.data = data;
  }
}
