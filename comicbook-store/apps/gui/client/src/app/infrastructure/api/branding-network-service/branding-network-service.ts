import { ComicBookCategoryItemDetailsDto } from '@api/dtos/comicbook-category-item-details.dto';
import { ComicBookCategoryItemDto } from '@api/dtos/comicbook-category-item.dto';
import { HttpClient } from '@api/interfaces/http-client.interface';
import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { Observable } from 'rxjs';

export class BrandingNetworkService implements BrandingRepository {
    readonly #httpClient: HttpClient;

    public constructor(httpClient: HttpClient) {
        this.#httpClient = httpClient;
    }

    public getBrandings(): Observable<ComicBookCategoryItem[]> {
        return this.#httpClient.get<ComicBookCategoryItemDto[]>('/brandings');
    }

    public getBrandingDetails(id: ComicBookCategoryItem['id']): Observable<ComicBookCategoryItemDetails> {
        return this.#httpClient.get<ComicBookCategoryItemDetailsDto>(`/brandings/${id}`);
    }
}
