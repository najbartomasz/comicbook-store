import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from './http-client.interface';

export class HttpClientAdapter implements HttpClient {
    readonly #httpClient: AngularHttpClient;

    public constructor(angularHttpClient: AngularHttpClient) {
        this.#httpClient = angularHttpClient;
    }

    public get<T>(path: string): Observable<T> {
        return this.#httpClient.get<T>(path);
    }
}
