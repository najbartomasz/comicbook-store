import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';

export const createLogEntry = (loggerName: string, message: string): LogEntry => ({
    timestamp: new Date().toISOString(),
    loggerName,
    message
});

export const createErrorLogEntry = (loggerName: string, message: string, error: unknown): ErrorLogEntry => ({
    ...createLogEntry(loggerName, message),
    error
});
