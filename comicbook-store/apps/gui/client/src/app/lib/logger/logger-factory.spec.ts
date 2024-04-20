import { ConsoleLogAppender } from './log-appender/console-log-appender';
import * as loggerModule from './logger';
import { LoggerFactory } from './logger-factory';

describe('LoggerFactory', () => {
    test('creates new logger instance', () => {
        // Given
        const consoleLogAppender = new ConsoleLogAppender();
        const expectedLogger = new loggerModule.Logger('TestLogger', consoleLogAppender);
        const loggerSpy = jest.spyOn(loggerModule, 'Logger').mockReturnValueOnce(expectedLogger);
        const loggerFactory = new LoggerFactory();

        // When
        const logger = loggerFactory.createLogger('TestLogger');

        // Then
        expect(logger).toBe(expectedLogger);
        expect(loggerSpy).toHaveBeenCalledTimes(1);
        expect(loggerSpy).toHaveBeenCalledWith('TestLogger', consoleLogAppender);
    });
});
