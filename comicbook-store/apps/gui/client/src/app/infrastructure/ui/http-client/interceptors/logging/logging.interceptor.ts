import { HttpInterceptorFn } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';
import { Logger } from '@lib/logger';
import { injectLogger } from '@ui/logger/logger.injector';
import { tap } from 'rxjs';

const LoggingInterceptorLoggerToken = new InjectionToken<Logger>('LoggingInterceptorLoggerToken', {
    providedIn: 'root',
    factory: () => injectLogger('LoggingInterceptor')
});

const stringifyBody = (body: unknown) => ((body !== undefined && body !== null) ? ` ${JSON.stringify(body)}` : '');

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const logger = inject(LoggingInterceptorLoggerToken);
    logger.info(`Requesting ${req.method} ${req.url}${stringifyBody(req.body)}`);
    return next(req)
        .pipe(
            tap({
                next: (response) => {
                    logger.info(`Response received ${JSON.stringify(response)}`);
                },
                error: (error: unknown) => {
                    logger.error(`Error received`, error);
                }
            })
        );
};
