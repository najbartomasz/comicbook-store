import { inject } from '@angular/core';
import { FeatureFactory } from '@di/feature';
import { ConcreteFeature, ConcreteFeatureId } from '@feature';

export const injectFeature = <T extends ConcreteFeatureId>(featureId: T): ConcreteFeature<T> => inject(FeatureFactory).create(featureId);
