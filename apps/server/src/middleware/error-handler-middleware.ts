import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).send({
    message: 'Internal Server Error',
    data: null,
    code: 500
  });
};

export default ErrorHandlerMiddleware;
