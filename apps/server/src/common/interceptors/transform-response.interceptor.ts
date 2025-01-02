import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NO_TRANSFORM_RESPONSE_KEY } from '../decorator/no-transform-response.decorator';

export interface CommonResponse<T = unknown> {
  statusCode: number;
  message: string | string[];
  data?: T;
  error?: string;
}

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse> {
    const noTransform = this.reflector.getAllAndOverride(NO_TRANSFORM_RESPONSE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (noTransform) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK,
        data,
        message: 'Success'
      }))
    );
  }
}
