import { FeatureFactoryMapper } from './feature-factory.mapper.model';

export type FeatureMapper = {
    [T in keyof FeatureFactoryMapper]: ReturnType<FeatureFactoryMapper[T]['create']>;
};
