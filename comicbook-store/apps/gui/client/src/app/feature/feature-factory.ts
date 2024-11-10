import { Factory } from '@core/models';
import { ConcreteFeatureId } from './concrete-feature-id.type';
import { ConcreteFeature } from './concrete-feature.type';
import { FeatureFactoryRepository } from './feature-factory-repository.model';

export class FeatureFactory implements Factory<ConcreteFeature<ConcreteFeatureId>> {
    readonly #featureFactoryRepository: FeatureFactoryRepository;

    public constructor(featureFactoryRepository: FeatureFactoryRepository) {
        this.#featureFactoryRepository = featureFactoryRepository;
    }

    public create<T extends ConcreteFeatureId>(featureId: T): ConcreteFeature<T> {
        return this.#featureFactoryRepository.getFeatureFactory(featureId).create() as ConcreteFeature<T>;
    }
}
