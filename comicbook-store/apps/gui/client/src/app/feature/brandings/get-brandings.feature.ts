import { CategoryItem } from '@core/models/category-item.model';
import { Observable } from 'rxjs';
import { BrandingsRepository } from './brandings-repository.interface';
import { GetBrandings } from './get-brandings.interface';

export class GetBrandingsFeature implements GetBrandings {
    readonly #brandingRepository: BrandingsRepository;

    public constructor(brandingsRepository: BrandingsRepository) {
        this.#brandingRepository = brandingsRepository;
    }

    public getBrandings(): Observable<CategoryItem[]> {
        return this.#brandingRepository.getAllBrandings();
    }
}
