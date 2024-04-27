import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerFactory } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { of, throwError } from 'rxjs';
import { loggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
    const setup = (loggerFactoryMock: LoggerFactory) => {
        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryToken, useValue: loggerFactoryMock }
            ]
        });
    };

    test('logs request without body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const req = new HttpRequest('GET', '/path');
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of({}));
        setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(req, nextMock));

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith('Requesting GET /path');
    });

    test('logs request with body', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const req = new HttpRequest('POST', '/path', { data: 1 });
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of({}));
        setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(req, nextMock));

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith(`Requesting POST /path {"data":1}`);
    });

    test('logs successfull response', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const req = new HttpRequest('POST', '/path', { data: 1 });
        const res = { status: 204, body: { data: 1 } };
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(of(res));
        setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(req, nextMock)).subscribe();

        // Then
        expect(loggerMock.info).toHaveBeenCalledTimes(2);
        expect(loggerMock.info).toHaveBeenNthCalledWith(2, `Response received {"status":204,"body":{"data":1}}`);
    });

    test('logs error response', () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const req = new HttpRequest('POST', '/path', { data: 1 });
        const res = new HttpErrorResponse({ status: 409 });
        const nextMock: HttpHandlerFn = jest.fn().mockReturnValueOnce(throwError(() => res));
        setup(loggerFactoryMock);

        // When
        TestBed.runInInjectionContext(() => loggingInterceptor(req, nextMock)).subscribe();

        // Then
        expect(loggerMock.error).toHaveBeenCalledTimes(1);
        expect(loggerMock.error).toHaveBeenCalledWith('Error received', res);
    });
});
