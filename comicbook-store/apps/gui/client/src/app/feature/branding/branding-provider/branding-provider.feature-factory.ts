import { FactoryStrategy } from '@comicbook-store/factory-strategy';
import { Factory } from '@core/models';
import { BrandingRepository } from '@feature';
import { BrandingProviderFeature } from './branding-provider.feature';

export class BrandingProviderFeatureFactory implements Factory<BrandingProviderFeature> {
    readonly #factoryStartegy: FactoryStrategy<BrandingProviderFeature>;
    readonly #brandingRepository: BrandingRepository;

    public constructor(factoryStartegy: FactoryStrategy<BrandingProviderFeature>, brandingRepository: BrandingRepository) {
        this.#factoryStartegy = factoryStartegy;
        this.#brandingRepository = brandingRepository;
    }

    public create(): BrandingProviderFeature {
        return this.#factoryStartegy.create(() => new BrandingProviderFeature(this.#brandingRepository));
    }
}
