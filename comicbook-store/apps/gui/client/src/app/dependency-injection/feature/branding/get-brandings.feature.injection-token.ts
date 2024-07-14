import { InjectionToken, inject } from '@angular/core';
import { BrandingRepository } from '@api/controllers/branding/branding.repository.injection-token';
import { GetBrandingsFeature as GetBrandings } from '@feature/branding/get-brandings.feature';
import { GetBrandings as GetBrandingsInterface } from '@feature/branding/get-brandings.interface';

export const GetBrandingsFeature = new InjectionToken<GetBrandingsInterface>('GetBrandingsFeature', {
    providedIn: 'root',
    factory: () => new GetBrandings(inject(BrandingRepository))
});
