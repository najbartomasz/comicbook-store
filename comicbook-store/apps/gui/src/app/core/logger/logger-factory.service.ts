import { Injectable, inject } from '@angular/core';
import { ConsoleLogAppenderService } from './log-appender/console-log-appender.service';
import { Logger } from './logger';

@Injectable({
    providedIn: 'root'
})
export class LoggerFactoryService {
    readonly #consoleLogAppender = inject(ConsoleLogAppenderService);

    public createLogger(loggerName: string): Logger {
        return new Logger(loggerName, this.#consoleLogAppender);
    }
}
