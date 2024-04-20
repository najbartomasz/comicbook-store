import { Provider } from '@angular/core';
import { LoggerFactory } from '@lib/logger';

export const provideLogger = (): Provider => LoggerFactory;
