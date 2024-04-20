import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@api/http-client/http-client.interface';
import brandings from './brandings.json';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService implements HttpClient {
    public get<T>(path: string): Observable<T> {
        if (path === '/brandings') {
            return of(brandings as T);
        }
        return EMPTY;
    }
}
