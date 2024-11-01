import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpStatus } from '@nestjs/common';
import { CommonResponse } from '@imperial-kitchen/types';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK,
        data,
        message: 'Success'
      }))
    );
  }
}
