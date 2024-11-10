import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { HttpClientAdapter, HttpClient as HttpClientInterface } from '@api';

export const HttpClient = new InjectionToken<HttpClientInterface>('HttpClient', {
    providedIn: 'root',
    factory: () => new HttpClientAdapter(inject(AngularHttpClient))
});
