import { LogAppender } from './log-appender/log-appender.model';
import { createErrorLogEntry, createLogEntry } from './log-entry-provider/log-entry-provider';

export class Logger {
    readonly #name: string;
    readonly #logAppender: LogAppender;

    public constructor(name: string, logAppender: LogAppender) {
        this.#name = name;
        this.#logAppender = logAppender;
    }

    public info(message: string): void {
        const logEntry = createLogEntry(this.#name, message);
        this.#logAppender.info(logEntry);
    }

    public warn(message: string): void {
        const logEntry = createLogEntry(this.#name, message);
        this.#logAppender.warn(logEntry);
    }

    public error(message: string, error: unknown): void {
        const errorLogEntry = createErrorLogEntry(this.#name, message, error);
        this.#logAppender.error(errorLogEntry);
    }
}
