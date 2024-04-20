import { Provider } from '@angular/core';
import { provideLogger } from './logger/logger.provider';

export const provideLib = (): Provider[] => [
    provideLogger()
];
