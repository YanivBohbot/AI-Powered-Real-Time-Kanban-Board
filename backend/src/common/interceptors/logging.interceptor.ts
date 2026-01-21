import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();

    const userAgent = request.get('user-agent') || '';
    const { ip, method, path } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();
        const statusCode = response.statusCode;

        // Safely access user.id (using optional chaining ?.)
        const userId = request.user?.id || 'Guest';

        const delay = Date.now() - now;

        this.logger.log(
          `${method} ${path} ${statusCode} - ${delay}ms - User: ${userId} - ${userAgent}`,
        );
      }),
    );
  }
}
