/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseInterceptors } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class ExcludeTimestampsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const excludeTimestamps = (item: any) => {
          const result = { ...item };
          delete result.createdAt;
          delete result.updatedAt;
          return result;
        };

        return Array.isArray(data) ? data.map(excludeTimestamps) : excludeTimestamps(data);
      })
    );
  }
}

export const ExcludeTimestamps = () => UseInterceptors(new ExcludeTimestampsInterceptor());
