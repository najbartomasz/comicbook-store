import { TestBed } from '@angular/core/testing';
import { ConsoleLogAppender } from './log-appender/console-log-appender';
import * as loggerModule from './logger';
import { LoggerFactoryService } from './logger-factory.service';

describe('LoggerFactoryService', () => {
    test('creates new logger instance', () => {
        // Given
        const consoleLogAppender = new ConsoleLogAppender();
        const expectedLogger = new loggerModule.Logger('TestLogger', consoleLogAppender);
        const loggerSpy = jest.spyOn(loggerModule, 'Logger').mockReturnValueOnce(expectedLogger);
        const loggerFactoryService = TestBed.inject(LoggerFactoryService);

        // When
        const logger = loggerFactoryService.createLogger('TestLogger');

        // Then
        expect(logger).toBe(expectedLogger);
        expect(loggerSpy).toHaveBeenCalledTimes(1);
        expect(loggerSpy).toHaveBeenCalledWith('TestLogger', consoleLogAppender);
    });
});
