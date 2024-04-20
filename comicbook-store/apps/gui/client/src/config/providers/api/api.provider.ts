import { Provider } from '@angular/core';
import { provideBrandingNetworkService } from './branding-network-service/branding-network-service.provider';

export const provideApi = (): Provider[] => [
    provideBrandingNetworkService()
];
