import { DataWarehouseEndpoint } from '@api/controllers';
import { CategoryItemDto, CategoryItemDtoMapper } from '@api/dto';
import { CategoryItem, HttpClient } from '@core/models';
import { BrandingRepository } from '@feature';
import { map, Observable } from 'rxjs';

export class BrandingController implements BrandingRepository {
    readonly #httpClient: HttpClient;
    readonly #dtoMapper: CategoryItemDtoMapper;

    public constructor(httpClient: HttpClient, dtoMapper: CategoryItemDtoMapper) {
        this.#httpClient = httpClient;
        this.#dtoMapper = dtoMapper;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#httpClient.get<CategoryItemDto[]>(DataWarehouseEndpoint.Brandings)
            .pipe(
                map((categoryItems) => this.#dtoMapper.fromDto(categoryItems))
            );
    }
}
