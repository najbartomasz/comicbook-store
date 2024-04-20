import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideApi } from 'config/providers/api/api.provider';
import { appRoutes } from './app.routes';
import { provideFeatures } from 'config/providers/feature/feature.provider';
import { provideLib } from './providers/lib/lib.provider';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        provideAnimationsAsync(),
        ...provideApi(),
        ...provideFeatures(),
        ...provideLib()
    ]
};
