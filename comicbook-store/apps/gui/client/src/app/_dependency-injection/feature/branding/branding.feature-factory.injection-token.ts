import { inject, InjectionToken } from '@angular/core';
import { BrandingController } from '@api/controllers';
import { SingletonFactoryStrategy } from '@core/services';
import { HttpClient } from '@di/api';
import { BrandingFeature, BrandingFeatureFactory as FeatureFactory } from '@feature';
import { CategoryItemDtoMapper } from 'app/infrastructure/api';

export const BrandingFeatureFactory = new InjectionToken<FeatureFactory>('BrandingFeatureFactory', {
    providedIn: 'root',
    factory: () => new FeatureFactory(
        new SingletonFactoryStrategy<BrandingFeature>(),
        new BrandingController(inject(HttpClient), new CategoryItemDtoMapper())
    )
});
