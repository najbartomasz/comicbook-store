import { CategoryItem } from '@core/models/category-item.model';
import { Observable } from 'rxjs';
import { BrandingRepository } from './branding-repository.interface';
import { GetBrandings } from './get-brandings.interface';

export class GetBrandingsFeature implements GetBrandings {
    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingsRepository: BrandingRepository) {
        this.#brandingRepository = brandingsRepository;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#brandingRepository.getAllBrandings();
    }
}
