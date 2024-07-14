import { DtoAdapter } from '@api/adapters/dto-adapter.interface';
import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { HttpClient } from '@api/http-client/http-client.interface';
import { CategoryItem } from '@core/models/category-item.model';
import { BrandingRepository } from '@feature/branding/branding-repository.interface';
import { map, Observable } from 'rxjs';

export class BrandingController implements BrandingRepository {
    readonly #httpClient: HttpClient;
    readonly #dtoAdapter: DtoAdapter<CategoryItemDto, CategoryItem>;

    public constructor(httpClient: HttpClient, dtoAdapter: DtoAdapter<CategoryItemDto, CategoryItem>) {
        this.#httpClient = httpClient;
        this.#dtoAdapter = dtoAdapter;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#httpClient.get<CategoryItemDto[]>('/brandings')
            .pipe(
                map((items) => items.map((item) => this.#dtoAdapter.fromDto(item)))
            );
    }
}
