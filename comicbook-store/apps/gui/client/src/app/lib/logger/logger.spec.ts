import { MockProxy, mock } from 'jest-mock-extended';
import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { Logger } from './logger';

describe('Logger', () => {
    let logger: Logger;

    let consoleLogAppenderMock: MockProxy<ConsoleLogAppender>;

    beforeEach(() => {
        const dateMock = new Date('2024-02-28T09:21:06.090Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);

        consoleLogAppenderMock = mock<ConsoleLogAppender>();
        logger = new Logger('TestLogger', consoleLogAppenderMock);
    });

    test('triggers console log appenders info', () => {
        // Given, When
        logger.info('Test info message.');

        // Then
        expect(consoleLogAppenderMock.info).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.info).toHaveBeenCalledWith({
            timestamp: '2024-02-28T09:21:06.090Z',
            loggerName: 'TestLogger',
            message: 'Test info message.'
        });
    });

    test('triggers console log appender warn', () => {
        // Given, When
        logger.warn('Test warn message.');

        // Then
        expect(consoleLogAppenderMock.warn).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.warn).toHaveBeenCalledWith({
            timestamp: '2024-02-28T09:21:06.090Z',
            loggerName: 'TestLogger',
            message: 'Test warn message.'
        });
    });

    test('triggers console log appender error', () => {
        // Given
        const error = new Error('Test error.');

        // When
        logger.error('Test error message.', error);

        // Then
        expect(consoleLogAppenderMock.error).toHaveBeenCalledTimes(1);
        expect(consoleLogAppenderMock.error).toHaveBeenCalledWith({
            timestamp: '2024-02-28T09:21:06.090Z',
            loggerName: 'TestLogger',
            message: 'Test error message.',
            error
        });
    });
});
