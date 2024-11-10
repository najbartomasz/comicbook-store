import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { InMemoryDatabaseService } from '@api';
import { withLoggingInterceptor, withUrlInterceptor } from '@ui/interceptors';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([withUrlInterceptor(), withLoggingInterceptor()])),
        importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDatabaseService)),
        provideAnimationsAsync()
    ]
};
