import { HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { injectLogger } from '@ui/logger/logger.injector';
import { tap } from 'rxjs';

const stringifyRequest = (method: string, url: string, body: unknown): string => {
    const message = `${method} ${url}`;
    return (body !== undefined && body !== null) ? `${message} ${JSON.stringify(body)}` : message;
};
const stringifyResponse = (method: string, url: string, event: HttpEvent<unknown>): string => {
    const message = `${method} ${url}`;
    if (event.type === HttpEventType.Response) {
        const messageWithStatus = `${message} ${event.status}`;
        return (event.body !== undefined && event.body !== null) ? `${messageWithStatus} ${JSON.stringify(event.body)}` : messageWithStatus;
    }
    return `${message} ${JSON.stringify(event)}`;
};

export const withLoggingInterceptor = (): HttpInterceptorFn => {
    let eventCounter = 0;
    return (req, next) => {
        const logger = injectLogger('LoggingInterceptor');
        const currentEventId = ++eventCounter;
        logger.info(`Request ${currentEventId}: ${stringifyRequest(req.method, req.url, req.body)}`);
        return next(req)
            .pipe(
                tap({
                    next: (event) => {
                        logger.info(`Response ${currentEventId}: ${stringifyResponse(req.method, req.url, event)}`);
                    },
                    error: (error: unknown) => {
                        logger.error(`Error ${currentEventId}`, error);
                    }
                })
            );
    };
};
