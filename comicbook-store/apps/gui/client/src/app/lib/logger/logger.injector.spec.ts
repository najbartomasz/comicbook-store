import { TestBed } from '@angular/core/testing';
import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { Logger } from './logger';
import { LoggerFactoryService } from './logger-factory.service';
import { injectLogger } from './logger.injector';

jest.mock('./logger');

describe('injectLogger', () => {
    test('creates logger', () => {
        // Given
        const loggerFactoryService = TestBed.inject(LoggerFactoryService);
        const loggerMock = new Logger('TestLogger', new ConsoleLogAppender());
        const createLoggerSpy = jest.spyOn(loggerFactoryService, 'createLogger').mockReturnValueOnce(loggerMock);

        // When
        const logger = TestBed.runInInjectionContext(() => injectLogger('TestLogger'));

        // Then
        expect(logger).toBe(loggerMock);
        expect(createLoggerSpy).toHaveBeenCalledTimes(1);
        expect(createLoggerSpy).toHaveBeenCalledWith('TestLogger');
    });
});
