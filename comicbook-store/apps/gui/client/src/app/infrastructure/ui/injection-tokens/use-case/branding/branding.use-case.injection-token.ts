import { InjectionToken, inject } from '@angular/core';
import { GetBrandingDetailsUseCase } from '@feature/interfaces/use-case/get-branding-details.use-case';
import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { BrandingFeature } from '@features/branding/branding.feature';
import { BrandingNetworkServiceToken } from '@ui/injection-tokens/api/branding-network-service.injection-token';

const BrandingFeatureToken = new InjectionToken<BrandingFeature>('BrandingFeature', {
    providedIn: 'root',
    factory: () => new BrandingFeature(inject(BrandingNetworkServiceToken))
});

export const GetBrandingsUseCaseToken = new InjectionToken<GetBrandingsUseCase>('GetBrandingsUseCase', {
    providedIn: 'root',
    factory: () => inject(BrandingFeatureToken)
});

export const GetBrandingDetailsUseCaseToken = new InjectionToken<GetBrandingDetailsUseCase>('GetBrandingDetailsUseCase', {
    providedIn: 'root',
    factory: () => inject(BrandingFeatureToken)
});
