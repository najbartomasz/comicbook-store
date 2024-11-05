import { inject, InjectionToken } from '@angular/core';
import { FeatureFactory as Factory } from '@feature/feature-factory';
import { FeatureFactoryRepositoryService } from '@ui/services/feature-factory-repository/feature-factory-repository.service';

export const FeatureFactory = new InjectionToken<Factory>('FeatureFactory', {
    providedIn: 'root',
    factory: () => new Factory(inject(FeatureFactoryRepositoryService))
});
