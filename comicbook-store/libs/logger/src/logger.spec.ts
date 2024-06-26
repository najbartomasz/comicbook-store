import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { Logger } from './logger';

jest.mock('./log-appender/console-log-appender');

describe('Logger', () => {
    test('triggers console log appender info', () => {
        // Given
        jest.setSystemTime(new Date('2024-02-28T09:21:06.090Z'));
        const consoleLogAppenderMock = new ConsoleLogAppender();
        const logger = new Logger('TestLogger', consoleLogAppenderMock);

        // When
        logger.info('Test info message.');

        // Then
        expect(consoleLogAppenderMock.info).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.info).toHaveBeenCalledWith({
            timestamp: new Date('2024-02-28T09:21:06.090Z'),
            loggerName: 'TestLogger',
            message: 'Test info message.'
        });
    });

    test('triggers console log appender warn', () => {
        // Given
        jest.setSystemTime(new Date('2024-02-28T09:21:06.090Z'));
        const consoleLogAppenderMock = new ConsoleLogAppender();
        const logger = new Logger('TestLogger', consoleLogAppenderMock);

        // When
        logger.warn('Test warn message.');

        // Then
        expect(consoleLogAppenderMock.warn).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.warn).toHaveBeenCalledWith({
            timestamp: new Date('2024-02-28T09:21:06.090Z'),
            loggerName: 'TestLogger',
            message: 'Test warn message.'
        });
    });

    test('triggers console log appender error', () => {
        // Given
        jest.setSystemTime(new Date('2024-02-28T09:21:06.090Z'));
        const consoleLogAppenderMock = new ConsoleLogAppender();
        const logger = new Logger('TestLogger', consoleLogAppenderMock);

        // When
        const error = new Error('Test error.');
        logger.error('Test error message.', error);

        // Then
        expect(consoleLogAppenderMock.error).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.error).toHaveBeenCalledWith({
            timestamp: new Date('2024-02-28T09:21:06.090Z'),
            loggerName: 'TestLogger',
            message: 'Test error message.',
            error
        });
    });
});
