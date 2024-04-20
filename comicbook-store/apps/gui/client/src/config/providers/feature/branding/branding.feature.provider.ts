import { Provider } from '@angular/core';
import { BrandingNetworkService } from '@api/branding-network-service/branding-network-service';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { BrandingFeature } from '@features/branding/branding.feature';

export const provideBrandingFeature = (): Provider => ({
    provide: BrandingFeature,
    useFactory: (brandingRepository: BrandingRepository) => new BrandingFeature(brandingRepository),
    deps: [BrandingNetworkService]
});
