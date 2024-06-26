/* eslint-disable no-console */
import { ConsoleLogAppender } from './console-log-appender';

describe('ConsoleLogAppenderService', () => {
    test('prints info log to debug console', () => {
        // Given
        jest.spyOn(console, 'info').mockImplementationOnce(jest.fn());
        const consoleLogAppender = new ConsoleLogAppender();

        // When
        consoleLogAppender.info({
            timestamp: new Date('2024-02-28T09:07:16.880Z'),
            loggerName: 'TestLogger',
            message: 'Test console info message.'
        });

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith('2024-02-28T09:07:16.880Z TestLogger INFO: Test console info message.');
    });

    test('prints warn log to debug console', () => {
        // Given
        jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn());
        const consoleLogAppender = new ConsoleLogAppender();

        // When
        consoleLogAppender.warn({
            timestamp: new Date('2024-02-28T09:07:16.880Z'),
            loggerName: 'TestLogger',
            message: 'Test console warn message.'
        });

        // Then
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith('2024-02-28T09:07:16.880Z TestLogger WARN: Test console warn message.');
    });

    test('prints error log to debug console when error is of Error type', () => {
        // Given
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const consoleLogAppender = new ConsoleLogAppender();

        // When
        consoleLogAppender.error({
            timestamp: new Date('2024-02-28T09:07:16.880Z'),
            loggerName: 'TestLogger',
            message: 'Test console error message.',
            error: new Error('Test error.')
        });

        // Then
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('2024-02-28T09:07:16.880Z TestLogger ERROR: Test console error message.', 'Test error.');
    });

    test('prints error log to debug console when error is of unknown type', () => {
        // Given
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const consoleLogAppender = new ConsoleLogAppender();

        // When
        consoleLogAppender.error({
            timestamp: new Date('2024-02-28T09:07:16.880Z'),
            loggerName: 'TestLogger',
            message: 'Test console error message.',
            error: { message: 'Test error.' }
        });

        // Then
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
            '2024-02-28T09:07:16.880Z TestLogger ERROR: Test console error message.', { message: 'Test error.' }
        );
    });
});
