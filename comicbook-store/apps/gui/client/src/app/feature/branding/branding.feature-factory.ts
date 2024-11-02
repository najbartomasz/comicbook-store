import { Factory } from '@core/models/factory.model';
import { BrandingRepository } from './branding-repository.model';
import { BrandingFeature } from './branding.feature';

export class BrandingFeatureFactory implements Factory<BrandingFeature> {
    readonly #brandingRepository: BrandingRepository;
    #featureInstance: BrandingFeature | undefined;

    public constructor(brandingRepository: BrandingRepository) {
        this.#brandingRepository = brandingRepository;
    }

    public create(): BrandingFeature {
        if (this.#featureInstance === undefined) {
            this.#featureInstance = new BrandingFeature(this.#brandingRepository);
        }
        return this.#featureInstance;
    }
}
