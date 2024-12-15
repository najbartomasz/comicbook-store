import { InjectionToken } from '@angular/core';
import { BrandingProviderFeatureId, ConcreteFeatureFactory, ConcreteFeatureId } from '@feature';
import { BrandingProviderFeatureFactory } from './branding/branding.feature-factory.injection-token';

type FeatureFactoryMapping = Record<ConcreteFeatureId, InjectionToken<ConcreteFeatureFactory<ConcreteFeatureId>>>;

export const FeatureFactoryMapping = new InjectionToken<FeatureFactoryMapping>('FeatureFactoryTokenMapping', {
    providedIn: 'root',
    factory: () => ({
        [BrandingProviderFeatureId]: BrandingProviderFeatureFactory
    })
});
