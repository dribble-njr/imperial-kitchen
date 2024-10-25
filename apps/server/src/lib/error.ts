import { ERROR_CODES } from '@imperial-kitchen/types';

export class AppError extends Error {
  public code: number;
  public data: unknown;
  public errors?: unknown[];

  constructor({
    message,
    code = 500,
    data = null,
    errors
  }: {
    message: ERROR_CODES;
    code?: number;
    data?: unknown;
    errors?: unknown[];
  }) {
    super(message);
    this.code = code;
    this.data = data;
    this.errors = errors;
  }
}
