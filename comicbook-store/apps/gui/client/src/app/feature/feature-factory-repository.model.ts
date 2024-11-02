import { FeatureFactoryMapper } from './feature-factory.mapper.model';

export interface FeatureFactoryRepository {
    getFeatureFactory<T extends keyof FeatureFactoryMapper>(featureId: T): FeatureFactoryMapper[T];
}
