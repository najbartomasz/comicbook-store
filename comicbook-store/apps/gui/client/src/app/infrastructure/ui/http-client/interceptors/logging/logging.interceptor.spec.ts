import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerFactory } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { Subject, of, throwError } from 'rxjs';
import { withLoggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
    const setup = (loggerFactoryMock: LoggerFactory) => {
        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryToken, useValue: loggerFactoryMock }
            ]
        });
        return { loggingInterceptor: withLoggingInterceptor() };
    };

    test('logs request without body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const request = new HttpRequest('GET', '/path');
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of());
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request, nextMock));

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith('Request 1: GET /path');
    });

    test('logs request with body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const request = new HttpRequest('POST', '/path', { data: 1 });
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of());
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request, nextMock));

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith(`Request 1: POST /path {"data":1}`);
    });

    test('logs successfull response', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const request = new HttpRequest('POST', '/path', { data: 1 });
        const response = new HttpResponse({ status: 204, body: { data: 1 } });
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of(response));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request, nextMock)).subscribe();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Response 1: POST /path 204 {"data":1}');
    });

    test('logs successfull event', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const request = new HttpRequest('POST', '/path', { data: 1 });
        const response: HttpSentEvent = { type: HttpEventType.Sent };
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of(response));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request, nextMock)).subscribe();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Response 1: POST /path {"type":0}');
    });

    test('logs error response', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const request = new HttpRequest('POST', '/path', { data: 1 });
        const response = new HttpErrorResponse({ status: 409 });
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(throwError(() => response));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request, nextMock)).subscribe();

        // Then
        expect(loggerMock.error).toHaveBeenCalledTimes(1);
        expect(loggerMock.error).toHaveBeenCalledWith('Error 1', response);
    });

    test('logs requests and responses in correct order', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture();
        const request1 = new HttpRequest('DELETE', '/path');
        const response1 = new Subject<HttpResponse<void>>();
        const request2 = new HttpRequest('GET', '/path');
        const response2 = new HttpResponse({ status: 200, body: { data: 1 } });
        const nextMock: HttpHandlerFn = jest.fn()
            .mockReturnValueOnce(response1)
            .mockReturnValueOnce(of(response2));
        const { loggingInterceptor } = setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(request1, nextMock)).subscribe();
        TestBed.runInInjectionContext(() => loggingInterceptor(request2, nextMock)).subscribe();
        response1.next(new HttpResponse({ status: 200 }));

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(4);
        expect(loggerMock.info).toHaveBeenNthCalledWith(1, 'Request 1: DELETE /path');
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'Request 2: GET /path');
        expect(loggerMock.info).toHaveBeenNthCalledWith(3, 'Response 2: GET /path 200 {"data":1}');
        expect(loggerMock.info).toHaveBeenNthCalledWith(4, 'Response 1: DELETE /path 200');
    });
});
