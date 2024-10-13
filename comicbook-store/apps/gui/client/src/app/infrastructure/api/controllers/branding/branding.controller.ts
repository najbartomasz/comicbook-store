import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { CategoryItemDtoMapper } from '@api/dto-mappers/category-item/category-item.dto-mapper';
import { HttpClient } from '@api/http-client/http-client.interface';
import { CategoryItem } from '@core/models/category-item.model';
import { BrandingRepository } from '@feature/branding/branding-repository.interface';
import { map, Observable } from 'rxjs';

export class BrandingController implements BrandingRepository {
    readonly #httpClient: HttpClient;
    readonly #dtoMapper: CategoryItemDtoMapper;

    public constructor(httpClient: HttpClient, dtoMapper: CategoryItemDtoMapper) {
        this.#httpClient = httpClient;
        this.#dtoMapper = dtoMapper;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#httpClient.get<CategoryItemDto[]>('/brandings')
            .pipe(
                map((categoryItems) => this.#dtoMapper.fromDto(categoryItems))
            );
    }
}
