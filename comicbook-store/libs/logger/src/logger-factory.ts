import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { Logger } from './logger';

export class LoggerFactory {
    readonly #consoleLogAppender = new ConsoleLogAppender();

    public createLogger(loggerName: string): Logger {
        return new Logger(loggerName, this.#consoleLogAppender);
    }
}
