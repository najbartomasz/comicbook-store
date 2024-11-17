import { inject, InjectionToken } from '@angular/core';
import { BrandingController, CategoryItemDtoMapper } from '@api';
import { SingletonFactoryStrategy } from '@core/services';
import { HttpClient } from '@di/api';
import { BrandingFeature, BrandingFeatureFactory as FeatureFactory } from '@feature';

export const BrandingFeatureFactory = new InjectionToken<FeatureFactory>('BrandingFeatureFactory', {
    providedIn: 'root',
    factory: () => new FeatureFactory(
        new SingletonFactoryStrategy<BrandingFeature>(),
        new BrandingController(inject(HttpClient), new CategoryItemDtoMapper())
    )
});
