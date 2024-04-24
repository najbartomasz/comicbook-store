import { InjectionToken, inject } from '@angular/core';
import { BrandingNetworkService } from '@api/branding-network-service/branding-network-service';
import { HttpClientService } from '@ui/http-client/http-client.service';
import { LoggerFactoryToken } from '../lib/logger-factory.injection-token';

export const BrandingNetworkServiceToken = new InjectionToken<BrandingNetworkService>('BrandingNetworkService', {
    providedIn: 'root',
    factory: () => new BrandingNetworkService(inject(LoggerFactoryToken), inject(HttpClientService))
});
