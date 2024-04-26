import { ComicBookBrandingDetailsDto } from '@api/dtos/comicbook-branding-details.dto';
import { ComicBookBrandingDto } from '@api/dtos/comicbook-branding.dto';
import { HttpClient } from '@api/interfaces/http-client.interface';
import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { Observable } from 'rxjs';

export class BrandingNetworkService implements BrandingRepository {
    readonly #httpClient: HttpClient;

    public constructor(httpClient: HttpClient) {
        this.#httpClient = httpClient;
    }

    public getBrandings(): Observable<ComicBookBranding[]> {
        return this.#httpClient.get<ComicBookBrandingDto[]>('/brandings');
    }

    public getBrandingDetails(id: number): Observable<ComicBookBrandingDetails> {
        return this.#httpClient.get<ComicBookBrandingDetailsDto>(`/brandings/${id}`);
    }
}
