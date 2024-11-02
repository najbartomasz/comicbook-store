import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { HttpClientAdapter } from '@api/http-client/http-client.adapter';
import { HttpClient as HttpClientInterface } from '@api/http-client/http-client.model';

export const HttpClient = new InjectionToken<HttpClientInterface>('HttpClient', {
    providedIn: 'root',
    factory: () => new HttpClientAdapter(inject(AngularHttpClient))
});
