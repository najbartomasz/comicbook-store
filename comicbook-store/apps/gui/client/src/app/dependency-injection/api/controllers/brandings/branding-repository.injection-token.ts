import { InjectionToken, inject } from '@angular/core';
import { BrandingsController } from '@api/controllers/brandings/brandings-controller';
import { HttpClient } from '@api/http-client.injection-token';
import { BrandingsRepository as BrandingsRepositoryInterface } from '@feature/brandings/brandings-repository.interface';

export const BrandingsRepository = new InjectionToken<BrandingsRepositoryInterface>('BrandingRepository', {
    providedIn: 'root',
    factory: () => new BrandingsController(inject(HttpClient))
});
