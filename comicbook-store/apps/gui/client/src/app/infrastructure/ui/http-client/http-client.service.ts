import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@api/interfaces/http-client.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService implements HttpClient {
    readonly #httpClient = inject(AngularHttpClient);

    public get<T>(path: string): Observable<T> {
        return this.#httpClient.get<T>(path);
    }
}
