import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';
import { LogAppender } from './log-appender.model';
import { LogLevel } from './log-level';

const formatLogEntry = (logLevel: LogLevel, logEntry: Readonly<LogEntry>): string => (
    `${logEntry.timestamp} ${logEntry.loggerName} ${logLevel}: ${logEntry.message}`
);

const formatErrorLogEntry = (errorLogEntry: Readonly<ErrorLogEntry>): string => {
    const { error, ...logEntry } = errorLogEntry;
    const message = formatLogEntry(LogLevel.Error, logEntry);
    const errorDescription = (error instanceof Error) ? error.message : JSON.stringify(error);
    return `${message} Caused by: ${errorDescription}`;
};

export const consoleLogAppender: LogAppender = {
    info: (logEntry: Readonly<LogEntry>): void => {
        // eslint-disable-next-line no-console
        console.info(formatLogEntry(LogLevel.Info, logEntry));
    },
    warn: (logEntry: Readonly<LogEntry>): void => {
        // eslint-disable-next-line no-console
        console.warn(formatLogEntry(LogLevel.Warn, logEntry));
    },
    error: (errorLogEntry: Readonly<ErrorLogEntry>): void => {
        // eslint-disable-next-line no-console
        console.error(formatErrorLogEntry(errorLogEntry));
    }
};
