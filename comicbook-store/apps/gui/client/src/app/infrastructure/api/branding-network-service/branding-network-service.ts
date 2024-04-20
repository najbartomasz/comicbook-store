import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '../http-client/http-client.interface';

export class BrandingNetworkService implements BrandingRepository {
    readonly #httpClient: HttpClient;

    public constructor(httpClient: HttpClient) {
        this.#httpClient = httpClient;
    }

    public getBrandings(): Observable<ComicBookBranding[]> {
        return this.#httpClient.get('/brandings');
    }
}
