import { ConcreteFeatureId } from './concrete-feature-id.type';
import { FeatureFactoryMapping } from './feature-factory-mapping.type';

export type ConcreteFeatureFactory<T extends ConcreteFeatureId> = FeatureFactoryMapping[T];
