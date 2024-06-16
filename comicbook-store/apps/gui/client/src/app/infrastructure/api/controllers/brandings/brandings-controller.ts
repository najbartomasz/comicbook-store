import { ComicBookCategoryItemDto } from '@api/data-transfer-objects/comicbook-category-item.dto';
import { HttpClient } from '@api/http-client/http-client.interface';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { BrandingsRepository } from '@feature/brandings/brandings-repository.interface';
import { Observable } from 'rxjs';

export class BrandingsController implements BrandingsRepository {
    readonly #httpClient: HttpClient;

    public constructor(httpClient: HttpClient) {
        this.#httpClient = httpClient;
    }

    public getAllBrandings(): Observable<ComicBookCategoryItem[]> {
        return this.#httpClient.get<ComicBookCategoryItemDto[]>('/brandings');
    }
}
