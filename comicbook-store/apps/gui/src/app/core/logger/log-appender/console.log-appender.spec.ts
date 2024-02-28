/* eslint-disable no-console */
import { consoleLogAppender } from './console.log-appender';

describe('ConsoleLogAppender', () => {
    test('prints info log to debug console', () => {
        // Given
        jest.spyOn(console, 'info').mockImplementationOnce(jest.fn());

        // When
        consoleLogAppender.info({ timestamp: '2024-02-28T09:07:16.880Z', loggerName: 'TestLogger', message: 'Test console info message.' });

        // Then
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith('2024-02-28T09:07:16.880Z TestLogger INFO: Test console info message.');
    });

    test('prints warn log to debug console', () => {
        // Given
        jest.spyOn(console, 'warn').mockImplementationOnce(jest.fn());

        // When
        consoleLogAppender.warn({ timestamp: '2024-02-28T09:07:16.880Z', loggerName: 'TestLogger', message: 'Test console warn message.' });

        // Then
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith('2024-02-28T09:07:16.880Z TestLogger WARN: Test console warn message.');
    });

    test('prints error log to debug console when error is of Error type', () => {
        // Given
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

        // When
        consoleLogAppender.error({
            timestamp: '2024-02-28T09:07:16.880Z',
            loggerName: 'TestLogger',
            message: 'Test console error message.',
            error: new Error('Test error.')
        });

        // Then
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
            '2024-02-28T09:07:16.880Z TestLogger ERROR: Test console error message. Caused by: Test error.'
        );
    });

    test('prints error log to debug console when error is of unknown type', () => {
        // Given
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

        // When
        consoleLogAppender.error({
            timestamp: '2024-02-28T09:07:16.880Z',
            loggerName: 'TestLogger',
            message: 'Test console error message.',
            error: { message: 'Test error.' }
        });

        // Then
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(
            '2024-02-28T09:07:16.880Z TestLogger ERROR: Test console error message. Caused by: {"message":"Test error."}'
        );
    });
});
