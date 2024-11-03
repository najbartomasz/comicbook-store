import { InjectionToken } from '@angular/core';
import { FeatureFactoryTokenMapper } from '@feature/feature-factory-token.mapper.injection-token';
import { FeatureFactoryMapper } from '@feature/feature-factory.mapper.model';
import { BrandingFeatureId } from '@feature/feature-id';
import { setupService } from '@test/fixtures/setup/setup-service.fixture';
import { mock } from 'jest-mock-extended';
import { FeatureFactoryRepositoryService } from './feature-factory-repository.service';

describe('FeatureFactoryRepository', () => {
    test('provieds feature factory for requested feature', () => {
        // Given
        const brandingFeatureFactoryMock = mock<FeatureFactoryMapper[typeof BrandingFeatureId]>();
        const brandingFeatureFactoryTokenStub = new InjectionToken('BrandingFeatureFactoryStub', {
            providedIn: 'root',
            factory: () => brandingFeatureFactoryMock
        });
        const featureFactoryRepository = setupService(FeatureFactoryRepositoryService, {
            providers: [
                { provide: FeatureFactoryTokenMapper, useValue: { [BrandingFeatureId]: brandingFeatureFactoryTokenStub } }
            ]
        });

        // When
        const featureFactory = featureFactoryRepository.getFeatureFactory(BrandingFeatureId);

        // Then
        expect(featureFactory).toBe(brandingFeatureFactoryMock);
    });
});
