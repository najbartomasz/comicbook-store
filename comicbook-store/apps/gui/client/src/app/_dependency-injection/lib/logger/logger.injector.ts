import { inject } from '@angular/core';
import { Logger } from '@comicbook-store/logger';
import { LoggerFactory } from './logger-factory.injection-token';

export const injectLogger = (loggerName: string): Logger => inject(LoggerFactory).createLogger(loggerName);
