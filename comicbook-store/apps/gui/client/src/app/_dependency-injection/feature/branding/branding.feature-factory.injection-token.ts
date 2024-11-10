import { inject, InjectionToken } from '@angular/core';
import { BrandingController, CategoryItemDtoMapper } from '@api';
import { HttpClient } from '@di/api';
import { BrandingFeatureFactory as FeatureFactory } from '@feature';

export const BrandingFeatureFactory = new InjectionToken<FeatureFactory>('BrandingFeatureFactory', {
    providedIn: 'root',
    factory: () => new FeatureFactory(new BrandingController(inject(HttpClient), new CategoryItemDtoMapper()))
});
