import { FeatureFactoryMapping } from './feature-factory-mapping.type';

export interface FeatureFactoryRepository {
    getFeatureFactory<T extends keyof FeatureFactoryMapping>(featureId: T): FeatureFactoryMapping[T];
}
