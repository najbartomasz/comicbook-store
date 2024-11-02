import { Factory } from '@core/models/factory.model';
import { FeatureFactoryRepository } from './feature-factory-repository.model';
import { FeatureMapper } from './feature.mapper.model';

export class FeatureFactory implements Factory<FeatureMapper[keyof FeatureMapper]> {
    readonly #featureFactoryRepository: FeatureFactoryRepository;

    public constructor(featureFactoryRepository: FeatureFactoryRepository) {
        this.#featureFactoryRepository = featureFactoryRepository;
    }

    public create<T extends keyof FeatureMapper>(featureId: T): FeatureMapper[T] {
        return this.#featureFactoryRepository.getFeatureFactory(featureId).create() as FeatureMapper[T];
    }
}
