import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/index.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); // 记录错误日志

  if (err instanceof AppError) {
    res.status(err.code).json({
      message: err.message,
      data: err.data || null,
      code: err.code
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
