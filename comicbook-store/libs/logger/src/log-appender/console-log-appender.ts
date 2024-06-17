import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';
import { LogLevel } from './log-level';

export class ConsoleLogAppender {
    public info(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.info(this.#formatLogEntry(LogLevel.Info, logEntry));
    }

    public warn(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.warn(this.#formatLogEntry(LogLevel.Warn, logEntry));
    }

    public error(errorLogEntry: ErrorLogEntry): void {
        const errorDescription = errorLogEntry.error instanceof Error ? errorLogEntry.error.message : errorLogEntry.error;
        // eslint-disable-next-line no-console
        console.error(this.#formatLogEntry(LogLevel.Error, errorLogEntry), errorDescription);
    }

    #formatLogEntry(logLevel: LogLevel, logEntry: LogEntry): string {
        return `${this.#mapTimestampToLocalISOString(logEntry.timestamp)} ${logEntry.loggerName} ${logLevel}: ${logEntry.message}`;
    }

    #mapTimestampToLocalISOString(timestamp: Date): string {
        const minuteInMs = 60000;
        const date = new Date(timestamp);
        date.setTime(timestamp.getTime() - (date.getTimezoneOffset() * minuteInMs));
        return date.toISOString();
    }
}
