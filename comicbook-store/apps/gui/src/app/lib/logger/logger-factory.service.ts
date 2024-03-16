import { Injectable } from '@angular/core';
import { ConsoleLogAppender } from './log-appender/console-log-appender';
import { Logger } from './logger';

@Injectable({
    providedIn: 'root'
})
export class LoggerFactoryService {
    readonly #consoleLogAppender = new ConsoleLogAppender();

    public createLogger(loggerName: string): Logger {
        return new Logger(loggerName, this.#consoleLogAppender);
    }
}
