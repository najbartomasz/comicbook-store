import { TestBed } from '@angular/core/testing';
import { Logger, LoggerFactory } from '@lib/logger';
import { mock } from 'jest-mock-extended';
import { injectLogger } from './logger.injector';

describe('injectLogger', () => {
    test('creates logger', () => {
        // Given
        const loggerFactoryMock = mock<LoggerFactory>();
        const loggerMock = mock<Logger>();
        loggerFactoryMock.createLogger.calledWith('TestLogger').mockReturnValueOnce(loggerMock);
        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactory, useValue: loggerFactoryMock }
            ]
        });

        // When
        const logger = TestBed.runInInjectionContext(() => injectLogger('TestLogger'));

        // Then
        expect(logger).toBe(loggerMock);
    });
});
