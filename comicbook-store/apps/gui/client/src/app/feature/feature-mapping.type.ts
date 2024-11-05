import { FeatureFactoryMapping } from './feature-factory-mapping.type';

export type FeatureMapping = {
    [T in keyof FeatureFactoryMapping]: ReturnType<FeatureFactoryMapping[T]['create']>;
};
