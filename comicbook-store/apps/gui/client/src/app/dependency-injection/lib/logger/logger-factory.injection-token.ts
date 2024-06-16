import { InjectionToken } from '@angular/core';
import { LoggerFactory as LoggerFactoryLib } from '@lib/logger';

export const LoggerFactory = new InjectionToken<LoggerFactoryLib>('LoggerFactory', {
    providedIn: 'root',
    factory: () => new LoggerFactoryLib()
});
