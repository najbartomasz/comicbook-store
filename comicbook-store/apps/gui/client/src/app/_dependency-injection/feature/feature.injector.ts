import { inject } from '@angular/core';
import { FeatureMapping } from '@feature/feature-mapping.type';
import { FeatureFactory } from './feature-factory.injection-token';

export const injectFeature = <T extends keyof FeatureMapping>(featureId: T): FeatureMapping[T] => (
    inject(FeatureFactory).create(featureId)
);
