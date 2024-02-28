import { consoleLogAppender } from './log-appender/console.log-appender';
import { createLogger } from './logger';

describe('Logger', () => {
    test('triggers console log appender info', () => {
        // Given
        const dateMock = new Date('2024-02-28T09:21:06.090Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);
        jest.spyOn(consoleLogAppender, 'info').mockImplementationOnce(jest.fn());
        const logger = createLogger('TestLogger');

        // When
        logger.info('Test info message.');

        // Then
        expect(consoleLogAppender.info).toHaveBeenCalledTimes(1);
        expect(consoleLogAppender.info).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test info message.' }
        );
    });

    test('triggers console log appender warn', () => {
        // Given
        const dateMock = new Date('2024-02-28T09:21:06.090Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);
        jest.spyOn(consoleLogAppender, 'warn').mockImplementationOnce(jest.fn());
        const logger = createLogger('TestLogger');

        // When
        logger.warn('Test warn message.');

        // Then
        expect(consoleLogAppender.warn).toHaveBeenCalledTimes(1);
        expect(consoleLogAppender.warn).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test warn message.' }
        );
    });

    test('triggers console log appender error', () => {
        // Given
        const dateMock = new Date('2024-02-28T09:21:06.090Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);
        jest.spyOn(consoleLogAppender, 'error').mockImplementationOnce(jest.fn());
        const error = new Error('Test error.');
        const logger = createLogger('TestLogger');

        // When
        logger.error('Test error message.', error);

        // Then
        expect(consoleLogAppender.error).toHaveBeenCalledTimes(1);
        expect(consoleLogAppender.error).toHaveBeenCalledWith(
            { timestamp: '2024-02-28T09:21:06.090Z', loggerName: 'TestLogger', message: 'Test error message.', error }
        );
    });
});
