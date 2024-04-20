import { Observable } from 'rxjs';

export interface HttpClient {
    get<T>(path: string): Observable<T>;
}
