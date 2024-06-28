import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerFactory } from '@comicbook-store/logger';
import { LoggerFactory as LoggerFactoryToken } from '@lib/logger/logger-factory.injection-token';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { EMPTY, Subject, asyncScheduler, catchError, delay, of, scheduled, throwError } from 'rxjs';
import { withLoggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
    const setup = (loggerFactory: LoggerFactory) => {
        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryToken, useValue: loggerFactory }
            ]
        });
        return { loggingInterceptor: withLoggingInterceptor() };
    };

    test('logs request without body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(new Subject<HttpResponse<unknown>>());
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('GET', '/path'), httpHandlerFnMock).subscribe();
        });

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith('Request 1: GET /path');
    });

    test('logs request with body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(new Subject<HttpResponse<unknown>>());
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('POST', '/path', { data: 1 }), httpHandlerFnMock).subscribe();
        });

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith(`Request 1: POST /path {"data":1}`);
    });

    test('logs successfull response without body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn()
            .mockReturnValueOnce(scheduled(of(new HttpResponse({ status: 204 })), asyncScheduler));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('POST', '/path', { data: 1 }), httpHandlerFnMock).subscribe();
        });
        jest.runAllTimers();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Response 1: POST /path 204');
    });

    test('logs successfull response with body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn()
            .mockReturnValueOnce(scheduled(of(new HttpResponse({ status: 200, body: { data: 1 } })), asyncScheduler));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('GET', '/path'), httpHandlerFnMock).subscribe();
        });
        jest.runAllTimers();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Response 1: GET /path 200 {"data":1}');
    });

    test('logs successfull event', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(scheduled(of({ type: HttpEventType.Sent }), asyncScheduler));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('POST', '/path', { data: 1 }), httpHandlerFnMock).subscribe();
        });
        jest.runAllTimers();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Response 1: POST /path {"type":0}');
    });

    test('logs error response', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const httpHandlerFnMock: HttpHandlerFn = jest.fn()
            .mockReturnValueOnce(scheduled(throwError(() => new HttpErrorResponse({ status: 409 })), asyncScheduler));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('POST', '/path', { data: 1 }), httpHandlerFnMock)
                .pipe(
                    catchError(() => EMPTY)
                )
                .subscribe();
        });
        jest.runAllTimers();

        // Then
        expect(loggerMock.error).toHaveBeenCalledTimes(1);
        expect(loggerMock.error).toHaveBeenCalledWith('Error 1', new HttpErrorResponse({ status: 409 }));
    });

    test('logs requests and responses in correct order', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor', { returnTimes: 'every' });
        const nextMock: HttpHandlerFn = jest.fn()
            .mockReturnValueOnce(of(new HttpResponse({ status: 200 })).pipe(delay(500)))
            .mockReturnValueOnce(of(new HttpResponse({ status: 200, body: { data: 1 } })).pipe(delay(300)));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // // When
        TestBed.runInInjectionContext(() => {
            loggingInterceptor(new HttpRequest('DELETE', '/path'), nextMock).subscribe();
            loggingInterceptor(new HttpRequest('GET', '/path'), nextMock).subscribe();
        });
        jest.runAllTimers();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(4);
        expect(loggerMock.info).toHaveBeenNthCalledWith(1, 'Request 1: DELETE /path');
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Request 2: GET /path');
        expect(loggerMock.info).toHaveBeenNthCalledWith(3, 'Response 2: GET /path 200 {"data":1}');
        expect(loggerMock.info).toHaveBeenNthCalledWith(4, 'Response 1: DELETE /path 200');
    });
});
