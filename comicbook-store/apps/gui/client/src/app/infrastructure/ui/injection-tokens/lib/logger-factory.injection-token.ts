import { InjectionToken } from '@angular/core';
import { LoggerFactory } from '@lib/logger';

export const LoggerFactoryToken = new InjectionToken<LoggerFactory>('LoggerFactory', {
    providedIn: 'root',
    factory: () => new LoggerFactory()
});
