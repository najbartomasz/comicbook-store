import { inject } from '@angular/core';
import { Logger } from '@lib/logger';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';

export const injectLogger = (loggerName: string): Logger => inject(LoggerFactoryToken).createLogger(loggerName);
