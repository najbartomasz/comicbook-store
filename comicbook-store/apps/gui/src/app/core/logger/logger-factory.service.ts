import { Injectable } from '@angular/core';
import { Logger } from './logger.model';
import { createLogger } from './logger';

@Injectable({
    providedIn: 'root'
})
export class LoggerFactoryService {
    public createLogger(loggerName: string): Logger {
        return createLogger(loggerName);
    }
}
