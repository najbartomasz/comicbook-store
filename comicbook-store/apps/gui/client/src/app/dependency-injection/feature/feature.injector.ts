import { inject } from '@angular/core';
import { FeatureFactory } from './feature-factory.injection-token';
import { FeatureMapper } from '@feature/feature.mapper.model';

export const injectFeature = <T extends keyof FeatureMapper>(featureId: T): FeatureMapper[T] => (
    inject(FeatureFactory).create(featureId)
);
