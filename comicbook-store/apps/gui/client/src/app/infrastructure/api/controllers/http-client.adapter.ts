import { HttpClient as AngularHttpClient } from '@angular/common/http';
import { HttpClient } from '@core/models';
import { Observable } from 'rxjs';

export class HttpClientAdapter implements HttpClient {
    readonly #httpClient: AngularHttpClient;

    public constructor(angularHttpClient: AngularHttpClient) {
        this.#httpClient = angularHttpClient;
    }

    public get<T>(path: string): Observable<T> {
        return this.#httpClient.get<T>(path);
    }

    public post<T>(path: string, body: unknown): Observable<T> {
        return this.#httpClient.post<T>(path, body);
    }
}
