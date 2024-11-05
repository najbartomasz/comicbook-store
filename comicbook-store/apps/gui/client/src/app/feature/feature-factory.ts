import { Factory } from '@core/models/factory.model';
import { FeatureFactoryRepository } from './feature-factory-repository.model';
import { FeatureMapping } from './feature-mapping.type';

export class FeatureFactory implements Factory<FeatureMapping[keyof FeatureMapping]> {
    readonly #featureFactoryRepository: FeatureFactoryRepository;

    public constructor(featureFactoryRepository: FeatureFactoryRepository) {
        this.#featureFactoryRepository = featureFactoryRepository;
    }

    public create<T extends keyof FeatureMapping>(featureId: T): FeatureMapping[T] {
        return this.#featureFactoryRepository.getFeatureFactory(featureId).create() as FeatureMapping[T];
    }
}
