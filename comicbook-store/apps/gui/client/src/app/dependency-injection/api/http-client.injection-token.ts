import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';
import { HttpClient as HttpClientInterface } from '@api/http-client/http-client.interface';

export const HttpClient = new InjectionToken<HttpClientInterface>('HttpClient', {
    providedIn: 'root',
    factory: () => inject(AngularHttpClient)
});
