import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapping } from '@feature/feature-factory-mapping.type';
import { BrandingFeatureId } from '@feature/feature-id';
import { BrandingFeatureFactory } from './branding/branding.feature-factory.injection-token';

type FactoryTokenMapping = {
    [T in keyof FeatureFactoryMapping]: InjectionToken<FeatureFactoryMapping[T]>;
}

export const FeatureFactoryTokenMapping = new InjectionToken<FactoryTokenMapping>('FeatureFactoryTokenMapping', {
    providedIn: 'root',
    factory: () => ({
        [BrandingFeatureId]: BrandingFeatureFactory
    })
});
