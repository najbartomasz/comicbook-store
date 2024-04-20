import { Provider } from '@angular/core';
import { BrandingNetworkService } from '@api/branding-network-service/branding-network-service';
import { HttpClient } from '@api/interfaces/http-client.interface';
import { LoggerFactory } from '@lib/logger';
import { HttpClientService } from '@ui/http-client/http-client.service';

export const provideBrandingNetworkService = (): Provider => ({
    provide: BrandingNetworkService,
    useFactory: (loggerFactory: LoggerFactory, httpClient: HttpClient) => new BrandingNetworkService(loggerFactory, httpClient),
    deps: [LoggerFactory, HttpClientService]
});
