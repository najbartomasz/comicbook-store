import { InjectionToken, inject } from '@angular/core';
import { BrandingsRepository } from '@api/controllers/brandings/branding-repository.injection-token';
import { GetBrandingsFeature as GetBrandings } from '@feature/brandings/get-brandings.feature';
import { GetBrandings as GetBrandingsInterface } from '@feature/brandings/get-brandings.interface';

export const GetBrandingsFeature = new InjectionToken<GetBrandingsInterface>('GetBrandingsFeature', {
    providedIn: 'root',
    factory: () => new GetBrandings(inject(BrandingsRepository))
});
