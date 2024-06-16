import { inject } from '@angular/core';
import { Logger } from '@lib/logger';
import { LoggerFactory } from './logger-factory.injection-token';

export const injectLogger = (loggerName: string): Logger => inject(LoggerFactory).createLogger(loggerName);
