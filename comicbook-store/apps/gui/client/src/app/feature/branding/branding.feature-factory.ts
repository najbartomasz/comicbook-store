import { Factory, FactoryStrategy } from '@core/models';
import { BrandingRepository } from './branding-repository.model';
import { BrandingFeature } from './branding.feature';

export class BrandingFeatureFactory implements Factory<BrandingFeature> {
    readonly #factoryStartegy: FactoryStrategy<BrandingFeature>;
    readonly #brandingRepository: BrandingRepository;

    public constructor(factoryStartegy: FactoryStrategy<BrandingFeature>, brandingRepository: BrandingRepository) {
        this.#factoryStartegy = factoryStartegy;
        this.#brandingRepository = brandingRepository;
    }

    public create(): BrandingFeature {
        return this.#factoryStartegy.create(() => new BrandingFeature(this.#brandingRepository));
    }
}
