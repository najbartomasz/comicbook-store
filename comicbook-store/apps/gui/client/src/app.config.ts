import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { withLoggingInterceptor } from '@ui/interceptors';
import { InMemoryDatabaseService } from '@ui/services';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([withLoggingInterceptor()])),
        importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDatabaseService, { apiBase: '/' })),
        provideAnimationsAsync()
    ]
};
