import { InjectionToken } from '@angular/core';
import { BrandingFeatureId, ConcreteFeatureFactory, ConcreteFeatureId } from '@feature';
import { BrandingFeatureFactory } from './branding/branding.feature-factory.injection-token';

type FeatureFactoryMapping = Record<ConcreteFeatureId, InjectionToken<ConcreteFeatureFactory<ConcreteFeatureId>>>;

export const FeatureFactoryMapping = new InjectionToken<FeatureFactoryMapping>('FeatureFactoryTokenMapping', {
    providedIn: 'root',
    factory: () => ({
        [BrandingFeatureId]: BrandingFeatureFactory
    })
});
