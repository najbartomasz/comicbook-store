import { createErrorLogEntry, createLogEntry } from './log-entry-provider';

describe('createLogEntry', () => {
    test('creates log entry', () => {
        // Given
        jest.setSystemTime(new Date('2024-03-08T18:30:48.904Z'));

        // When
        const logEntry = createLogEntry('TestLogger', 'Test message.');

        // Then
        expect(logEntry).toStrictEqual({
            timestamp: '2024-03-08T18:30:48.904Z',
            loggerName: 'TestLogger',
            message: 'Test message.'
        });
    });
});

describe('createErrorLogEntry', () => {
    test('creates error log entry', () => {
        // Given
        jest.setSystemTime(new Date('2024-03-08T18:30:48.904Z'));

        // When
        const error = new Error('Test error.');
        const logEntry = createErrorLogEntry(
            'TestLogger',
            'Test message.',
            error
        );

        // Then
        expect(logEntry).toStrictEqual({
            timestamp: '2024-03-08T18:30:48.904Z',
            loggerName: 'TestLogger',
            message: 'Test message.',
            error
        });
    });
});
