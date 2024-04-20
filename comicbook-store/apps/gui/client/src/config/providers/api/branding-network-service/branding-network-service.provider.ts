import { Provider } from '@angular/core';
import { BrandingNetworkService } from '@api/branding-network-service/branding-network-service';
import { HttpClient } from '@api/http-client/http-client.interface';
import { HttpClientService } from '@ui/http-client/http-client.service';

export const provideBrandingNetworkService = (): Provider => ({
    provide: BrandingNetworkService,
    useFactory: (httpClient: HttpClient) => new BrandingNetworkService(httpClient),
    deps: [HttpClientService]
});
