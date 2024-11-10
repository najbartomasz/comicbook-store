import { CategoryItem, Feature } from '@core/models';
import { Observable } from 'rxjs';
import { BrandingRepository } from './branding-repository.model';

export const BrandingFeatureId = 'BrandingFeature';

export class BrandingFeature implements Feature {
    public get id(): Feature['id'] { return BrandingFeatureId; }

    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingsRepository: BrandingRepository) {
        this.#brandingRepository = brandingsRepository;
    }

    public getAllBrandings(): Observable<CategoryItem[]> {
        return this.#brandingRepository.getAllBrandings();
    }
}
