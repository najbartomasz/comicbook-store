import { inject, InjectionToken } from '@angular/core';
import { FeatureFactory as Factory } from '@feature';
import { FeatureFactoryRepositoryService } from '@ui/services';

export const FeatureFactory = new InjectionToken<Factory>('FeatureFactory', {
    providedIn: 'root',
    factory: () => new Factory(inject(FeatureFactoryRepositoryService))
});
