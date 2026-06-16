import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/** Standardized API response shape */
interface ResponseShape<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

/**
 * Wraps all controller responses in a consistent { data, statusCode, timestamp } envelope.
 * Makes frontend parsing predictable.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseShape<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseShape<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
