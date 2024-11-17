import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { HttpClientAdapter } from '@api/controllers';
import { HttpClient as HttpClientInterface } from '@core/models';

export const HttpClient = new InjectionToken<HttpClientInterface>('HttpClient', {
    providedIn: 'root',
    factory: () => new HttpClientAdapter(inject(AngularHttpClient))
});
