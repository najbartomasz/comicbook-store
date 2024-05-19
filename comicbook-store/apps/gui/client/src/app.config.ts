import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { InMemoryDatabaseService } from '@ui/http-client/in-memory-web-api/in-memory-database.service';
import { withLoggingInterceptor } from '@ui/http-client/interceptors/logging/logging.interceptor';
import { withUrlInterceptor } from '@ui/http-client/interceptors/url/url.interceptor';
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
