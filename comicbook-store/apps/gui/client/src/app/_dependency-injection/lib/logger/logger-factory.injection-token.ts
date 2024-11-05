import { InjectionToken } from '@angular/core';
import { LoggerFactory as LoggerFactoryLib } from '@comicbook-store/logger';

export const LoggerFactory = new InjectionToken<LoggerFactoryLib>('LoggerFactory', {
    providedIn: 'root',
    factory: () => new LoggerFactoryLib()
});
