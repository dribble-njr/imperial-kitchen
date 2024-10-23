import { Request, Response, NextFunction } from 'express';
import { ERROR_CODES } from '@imperial-kitchen/types';
import { AppError } from '../lib/error.ts';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export default function validateDtoMiddleware(dto: ClassConstructor<object>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const detailedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints
      }));
      next(new AppError({ message: ERROR_CODES.INVALID_PARAMS, code: 400, errors: detailedErrors }));
    } else {
      next();
    }
  };
}
