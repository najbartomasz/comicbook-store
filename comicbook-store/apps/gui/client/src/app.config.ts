import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { InMemoryDatabaseService } from '@ui/http-client/in-memory-web-api/in-memory-database.service';
import { loggingInterceptor } from '@ui/http-client/interceptors/logging/logging.interceptor';
import { urlInterceptor } from '@ui/http-client/interceptors/url/url.interceptor';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([urlInterceptor, loggingInterceptor])),
        importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryDatabaseService)),
        provideAnimationsAsync()
    ]
};
