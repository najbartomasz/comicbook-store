import { ConcreteFeatureFactory } from './concrete-feature-factory.type';
import { ConcreteFeatureId } from './concrete-feature-id.type';

export type ConcreteFeature<T extends ConcreteFeatureId> = ReturnType<ConcreteFeatureFactory<T>['create']>;
