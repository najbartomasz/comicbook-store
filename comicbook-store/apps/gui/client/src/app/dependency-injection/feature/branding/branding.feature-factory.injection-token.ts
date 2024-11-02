import { inject, InjectionToken } from '@angular/core';
import { BrandingController } from '@api/controllers/branding/branding.controller';
import { CategoryItemDtoMapper } from '@api/dto-mappers/category-item/category-item.dto-mapper';
import { HttpClient } from '@api/http-client.injection-token';
import { BrandingFeatureFactory as FeatureFactory } from '@feature/branding/branding.feature-factory';

export const BrandingFeatureFactory = new InjectionToken<FeatureFactory>('BrandingFeatureFactory', {
    providedIn: 'root',
    factory: () => new FeatureFactory(new BrandingController(inject(HttpClient), new CategoryItemDtoMapper()))
});
