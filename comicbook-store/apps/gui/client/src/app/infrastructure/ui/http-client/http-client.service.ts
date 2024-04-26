import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@api/interfaces/http-client.interface';
import brandings from './brandings.json';
import brandingDetails from './branding-details.json';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService implements HttpClient {
    public get<T>(path: string): Observable<T> {
        if (path === '/brandings') {
            return of(brandings as T);
        }
        if (new RegExp(/^\/brandings\/\d+$/u, 'u').exec(path)) {
            const brandingId = Number(path.split('/').pop());
            return of(brandingDetails.find(({ id }) => id === brandingId) as T);
        }
        return EMPTY;
    }
}
