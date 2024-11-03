import { inject } from '@angular/core';
import { FeatureMapper } from '@feature/feature.mapper.model';
import { FeatureFactory } from './feature-factory.injection-token';

export const injectFeature = <T extends keyof FeatureMapper>(featureId: T): FeatureMapper[T] => (
    inject(FeatureFactory).create(featureId)
);
