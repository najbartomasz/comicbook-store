import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapping } from '@feature/feature-factory-mapping.type';
import { FeatureFactoryTokenMapping } from '@feature/feature-factory-token-mapping.injection-token';
import { BrandingFeatureId } from '@feature/feature-id';
import { setupService } from '@test/fixtures/setup/setup-service.fixture';
import { mock } from 'jest-mock-extended';
import { FeatureFactoryRepositoryService } from './feature-factory-repository.service';

describe('FeatureFactoryRepository', () => {
    test('provieds feature factory for requested feature', () => {
        // Given
        const brandingFeatureFactoryMock = mock<FeatureFactoryMapping[typeof BrandingFeatureId]>();
        const brandingFeatureFactoryTokenStub = new InjectionToken('BrandingFeatureFactoryStub', {
            providedIn: 'root',
            factory: () => brandingFeatureFactoryMock
        });
        const featureFactoryRepository = setupService(FeatureFactoryRepositoryService, {
            providers: [
                { provide: FeatureFactoryTokenMapping, useValue: { [BrandingFeatureId]: brandingFeatureFactoryTokenStub } }
            ]
        });

        // When
        const featureFactory = featureFactoryRepository.getFeatureFactory(BrandingFeatureId);

        // Then
        expect(featureFactory).toBe(brandingFeatureFactoryMock);
    });
});
