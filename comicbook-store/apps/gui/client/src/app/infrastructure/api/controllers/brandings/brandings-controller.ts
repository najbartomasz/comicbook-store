import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { HttpClient } from '@api/http-client/http-client.interface';
import { CategoryItem } from '@core/models/category-item.model';
import { BrandingsRepository } from '@feature/brandings/brandings-repository.interface';
import { Observable } from 'rxjs';

export class BrandingsController implements BrandingsRepository {
    readonly #httpClient: HttpClient;

    public constructor(httpClient: HttpClient) {
        this.#httpClient = httpClient;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#httpClient.get<CategoryItemDto[]>('/brandings');
    }
}
