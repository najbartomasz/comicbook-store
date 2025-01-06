import { createErrorLogEntry, createLogEntry } from './log-entry-creator';

describe('createLogEntry', () => {
    test('creates log entry', () => {
        // Given
        jest.setSystemTime(new Date('2024-03-08T18:30:48.904Z'));

        // When
        const logEntry = createLogEntry('TestLogger', 'Test message.');

        // Then
        expect(logEntry).toStrictEqual({
            timestamp: new Date('2024-03-08T18:30:48.904Z'),
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
        const logEntry = createErrorLogEntry(
            'TestLogger',
            'Test message.',
            new Error('Test error.')
        );

        // Then
        expect(logEntry).toStrictEqual({
            timestamp: new Date('2024-03-08T18:30:48.904Z'),
            loggerName: 'TestLogger',
            message: 'Test message.',
            error: new Error('Test error.')
        });
    });
});
