import { ErrorLogEntry } from './error-log-entry.model';
import { consoleLogAppender } from './log-appender/console.log-appender';
import { LogEntry } from './log-entry.model';
import { Logger } from './logger.model';

const createLogEntry = (loggerName: string, message: string): LogEntry => ({
    timestamp: new Date().toISOString(),
    loggerName,
    message
});

const createErrorLogEntry = (loggerName: string, message: string, error: unknown): ErrorLogEntry => ({
    ...createLogEntry(loggerName, message),
    error
});

export const createLogger = (name: string): Logger => ({
    info: (message: string): void => {
        consoleLogAppender.info(createLogEntry(name, message));
    },
    warn: (message: string): void => {
        consoleLogAppender.warn(createLogEntry(name, message));
    },
    error: (message: string, error: unknown): void => {
        consoleLogAppender.error(createErrorLogEntry(name, message, error));
    }
});
