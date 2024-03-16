import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';
import { createErrorLogEntry, createLogEntry } from './log-entry-provider';

describe('createLogEntry', () => {
    test('creates log entry', () => {
        // Given
        const dateMock = new Date('2024-03-08T18:30:48.904Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);
        const expectedLogEntry: LogEntry = {
            timestamp: dateMock.toISOString(),
            loggerName: 'TestLogger',
            message: 'Test message.'
        };

        // When
        const logEntry = createLogEntry('TestLogger', 'Test message.');

        // Then
        expect(logEntry).toStrictEqual(expectedLogEntry);
    });
});

describe('createErrorLogEntry', () => {
    test('creates error log entry', () => {
        // Given
        const dateMock = new Date('2024-03-08T18:30:48.904Z');
        jest.spyOn(global, 'Date').mockReturnValueOnce(dateMock);
        const error = new Error('Test error.');
        const expectedErrorLogEntry: ErrorLogEntry = {
            timestamp: dateMock.toISOString(),
            loggerName: 'TestLogger',
            message: 'Test message.',
            error
        };

        // When
        const logEntry = createErrorLogEntry(
            'TestLogger',
            'Test message.',
            error
        );

        // Then
        expect(logEntry).toStrictEqual(expectedErrorLogEntry);
    });
});
