import { ConcreteFeatureFactory } from './concrete-feature-factory.type';
import { ConcreteFeatureId } from './concrete-feature-id.type';

export interface FeatureFactoryRepository {
    getFeatureFactory<T extends ConcreteFeatureId>(featureId: T): ConcreteFeatureFactory<T>;
}
