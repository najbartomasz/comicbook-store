import { InjectionToken, inject } from '@angular/core';
import { BrandingDtoAdapter } from '@api/adapters/branding/branding.dto-adapter.injection-token';
import { BrandingController } from '@api/controllers/branding/branding.controller';
import { HttpClient } from '@api/http-client.injection-token';
import { BrandingRepository as BrandingRepositoryInterface } from '@feature/branding/branding-repository.interface';

export const BrandingRepository = new InjectionToken<BrandingRepositoryInterface>('BrandingRepository', {
    providedIn: 'root',
    factory: () => new BrandingController(inject(HttpClient), inject(BrandingDtoAdapter))
});
