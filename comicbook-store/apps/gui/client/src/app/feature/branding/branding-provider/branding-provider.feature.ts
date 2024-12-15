import { CategoryItem, Feature } from '@core/models';
import { BrandingRepository } from '@feature';
import { Observable } from 'rxjs';

export const BrandingProviderFeatureId = 'BrandingProviderFeature';

export class BrandingProviderFeature implements Feature {
    public get id(): Feature['id'] { return BrandingProviderFeatureId; }

    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingsRepository: BrandingRepository) {
        this.#brandingRepository = brandingsRepository;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#brandingRepository.getAllBrandings();
    }
}
