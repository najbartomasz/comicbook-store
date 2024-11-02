import { InjectionToken } from '@angular/core';
import { BrandingFeatureFactory } from '@feature/branding/branding.feature-factory.injection-token';
import { BrandingFeatureId } from '@feature/feature-id';
import { FeatureFactoryTokenMapper as FactoryTokenMapper } from './feature-factory-token.mapper.model';

export const FeatureFactoryTokenMapper = new InjectionToken<FactoryTokenMapper>('FeatureFactoryMapper', {
    providedIn: 'root',
    factory: () => ({
        [BrandingFeatureId]: BrandingFeatureFactory
    })
});
