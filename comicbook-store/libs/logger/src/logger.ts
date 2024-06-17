import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { createErrorLogEntry, createLogEntry } from './log-entry-provider/log-entry-provider';

export class Logger {
    readonly #name: string;
    readonly #logAppender: ConsoleLogAppender;

    public constructor(name: string, logAppender: ConsoleLogAppender) {
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
