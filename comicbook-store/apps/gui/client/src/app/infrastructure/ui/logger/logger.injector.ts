import { inject } from '@angular/core';
import { Logger, LoggerFactory } from '@lib/logger';

export const injectLogger = (loggerName: string): Logger => inject(LoggerFactory).createLogger(loggerName);
