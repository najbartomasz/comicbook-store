import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';
import { LogAppender } from './log-appender.model';
import { LogLevel } from './log-level';

export class ConsoleLogAppender implements LogAppender {
    public info(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.info(this.#formatLogEntry(LogLevel.Info, logEntry));
    }

    public warn(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.warn(this.#formatLogEntry(LogLevel.Warn, logEntry));
    }

    public error(errorLogEntry: ErrorLogEntry): void {
        // eslint-disable-next-line no-console
        console.error(this.#formatErrorLogEntry(errorLogEntry));
    }

    #formatLogEntry(logLevel: LogLevel, logEntry: LogEntry): string {
        return `${logEntry.timestamp} ${logEntry.loggerName} ${logLevel}: ${logEntry.message}`;
    }

    #formatErrorLogEntry(errorLogEntry: ErrorLogEntry): string {
        const { error, ...logEntry } = errorLogEntry;
        const message = this.#formatLogEntry(LogLevel.Error, logEntry);
        const errorDescription = (error instanceof Error) ? error.message : JSON.stringify(error);
        return `${message} Caused by: ${errorDescription}`;
    }
}
