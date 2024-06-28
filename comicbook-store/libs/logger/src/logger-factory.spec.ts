import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { LogAppender } from './log-appender/log-appender.model';
import { Logger } from './logger';
import { LoggerFactory } from './logger-factory';

jest.mock('./log-appender/console-log-appender');
jest.mock('./logger');
const LoggerMock = Logger as jest.Mock<Logger, [string, LogAppender]>;

describe('LoggerFactory', () => {
    test('creates new logger instance', () => {
        // Given
        const loggerFactory = new LoggerFactory();

        // When
        const logger = loggerFactory.createLogger('TestLogger');

        // Then
        expect(logger).toBeInstanceOf(LoggerMock);
        expect(LoggerMock).toHaveBeenCalledTimes(1);
        const [loggerCallArgs] = LoggerMock.mock.calls;
        expect(loggerCallArgs).toHaveLength(2);
        expect(loggerCallArgs[0]).toBe('TestLogger');
        expect(loggerCallArgs[1]).toBeInstanceOf(ConsoleLogAppender);
        expect(ConsoleLogAppender).toHaveBeenCalledTimes(1);
    });
});
