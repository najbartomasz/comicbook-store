import { HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { Counter, IncrementalCounter } from '@comicbook-store/counter';
import { injectLogger } from '@ui/injectors';
import { tap } from 'rxjs';

const formatMessage = (message: string, data: unknown): string => (
    (data !== undefined && data !== null) ? `${message} ${JSON.stringify(data)}` : message
);

const stringifyRequest = (method: string, url: string, body: unknown): string => (
    formatMessage(`${method} ${url}`, body)
);

const stringifyResponse = (method: string, url: string, event: HttpEvent<unknown>): string => {
    const baseMessage = `${method} ${url}`;
    return (event.type === HttpEventType.Response)
        ? formatMessage(`${baseMessage} ${event.status}`, event.body)
        : formatMessage(baseMessage, event);
};

const logHttpEvent = (eventCounter: Counter): HttpInterceptorFn => (req, next) => {
    const logger = injectLogger('LoggingInterceptor');
    const eventId = eventCounter.nextValue;
    logger.info(`Request ${eventId}: ${stringifyRequest(req.method, req.url, req.body)}`);
    return next(req)
        .pipe(
            tap({
                next: (event) => {
                    logger.info(`Response ${eventId}: ${stringifyResponse(req.method, req.url, event)}`);
                },
                error: (error: unknown) => {
                    logger.error(`Error ${eventId}`, error);
                }
            })
        );
};

export const withLoggingInterceptor = (): HttpInterceptorFn => logHttpEvent(new IncrementalCounter());
