export const ERROR_CODES = {
  USER_EXISTS: 'ERR_USER_EXISTS',
  CAPTCHA_EXPIRED: 'ERR_CAPTCHA_EXPIRED',
  CAPTCHA_ERROR: 'ERR_CAPTCHA_ERROR',
  USER_NOT_FOUND: 'ERR_USER_NOT_FOUND',
  INVALID_PASSWORD: 'ERR_INVALID_PASSWORD'
};

export class AppError extends Error {
  public code: number;
  public data: unknown;

  constructor(message: string, code: number = 500, data: unknown = null) {
    super(message);
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
