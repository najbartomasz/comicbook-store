import { ConsoleLogAppenderService } from './log-appender/console-log-appender.service';
import { createErrorLogEntry, createLogEntry } from './log-entry-provider/log-entry-provider';

export class Logger {
    readonly #name: string;
    readonly #logAppender: ConsoleLogAppenderService;

    public constructor(name: string, logAppender: ConsoleLogAppenderService) {
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
