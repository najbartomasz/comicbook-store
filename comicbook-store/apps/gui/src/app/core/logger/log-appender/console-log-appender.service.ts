import { Injectable } from '@angular/core';
import { ErrorLogEntry } from '../error-log-entry.model';
import { LogEntry } from '../log-entry.model';
import { LogLevel } from './log-level';

@Injectable({
    providedIn: 'root'
})
export class ConsoleLogAppenderService {
    public info(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.info(this.#formatLogEntry(LogLevel.Info, logEntry));
    }

    public warn(logEntry: LogEntry): void {
        // eslint-disable-next-line no-console
        console.warn(this.#formatLogEntry(LogLevel.Warn, logEntry));
    }

    public error(errorLogEntry: ErrorLogEntry): void {
        const errorDescription = (errorLogEntry.error instanceof Error) ? errorLogEntry.error.message : errorLogEntry.error;
        // eslint-disable-next-line no-console
        console.error(this.#formatLogEntry(LogLevel.Error, errorLogEntry), errorDescription);
    }

    #formatLogEntry(logLevel: LogLevel, logEntry: LogEntry): string {
        return `${logEntry.timestamp} ${logEntry.loggerName} ${logLevel}: ${logEntry.message}`;
    }
}
