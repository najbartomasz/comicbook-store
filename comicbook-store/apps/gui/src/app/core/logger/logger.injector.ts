import { inject } from '@angular/core';
import { Logger } from './logger';
import { LoggerFactoryService } from './logger-factory.service';

export const injectLogger = (loggerName: string): Logger => inject(LoggerFactoryService).createLogger(loggerName);
