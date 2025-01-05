import { inject, InjectionToken } from '@angular/core';
import { BrandingController } from '@api/controllers';
import { SingletonFactoryStrategy } from '@comicbook-store/factory-strategy';
import { HttpClient } from '@di/api';
import { BrandingProviderFeature, BrandingProviderFeatureFactory as FeatureFactory } from '@feature';
import { CategoryItemDtoMapper } from 'app/infrastructure/api';

export const BrandingProviderFeatureFactory = new InjectionToken<FeatureFactory>('BrandingProviderFeatureFactory', {
    providedIn: 'root',
    factory: () => new FeatureFactory(
        new SingletonFactoryStrategy<BrandingProviderFeature>(),
        new BrandingController(inject(HttpClient), new CategoryItemDtoMapper())
    )
});
