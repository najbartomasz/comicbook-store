import { LogAppender } from './log-appender/log-appender.model';
import { createErrorLogEntry, createLogEntry } from './log-entry-provider/log-entry-provider';

export class Logger {
    readonly #name: string;
    readonly #appenders: readonly LogAppender[];

    public constructor(name: string, appenders: readonly [LogAppender, ...LogAppender[]]) {
        this.#name = name;
        this.#appenders = appenders;
    }

    public info(message: string): void {
        const logEntry = createLogEntry(this.#name, message);
        this.#appenders.forEach((appender) => {
            appender.info(logEntry);
        });
    }

    public warn(message: string): void {
        const logEntry = createLogEntry(this.#name, message);
        this.#appenders.forEach((appender) => {
            appender.warn(logEntry);
        });
    }

    public error(message: string, error: unknown): void {
        const errorLogEntry = createErrorLogEntry(this.#name, message, error);
        this.#appenders.forEach((appender) => {
            appender.error(errorLogEntry);
        });
    }
}
