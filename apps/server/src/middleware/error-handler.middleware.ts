import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/index.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  // TODO: add logger
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.code).json({
      message: err.message,
      data: err.data || null,
      code: err.code,
      errors: err.errors
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      data: null,
      code: 500
    });
  }
};

export default ErrorHandlerMiddleware;
