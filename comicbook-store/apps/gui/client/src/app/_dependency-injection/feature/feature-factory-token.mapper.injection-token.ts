import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapper } from '@feature/feature-factory.mapper.model';
import { BrandingFeatureId } from '@feature/feature-id';
import { BrandingFeatureFactory } from './branding/branding.feature-factory.injection-token';

type FactoryTokenMapper = {
    [T in keyof FeatureFactoryMapper]: InjectionToken<FeatureFactoryMapper[T]>;
}

export const FeatureFactoryTokenMapper = new InjectionToken<FactoryTokenMapper>('FeatureFactoryTokenMapper', {
    providedIn: 'root',
    factory: () => ({
        [BrandingFeatureId]: BrandingFeatureFactory
    })
});
