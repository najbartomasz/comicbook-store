import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapping } from '@di/feature';
import { BrandingFeatureFactory, BrandingFeatureId } from '@feature';
import { setupService } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { FeatureFactoryRepositoryService } from './feature-factory-repository.service';

describe('FeatureFactoryRepository', () => {
    test('provides feature factory for requested feature', () => {
        // Given
        const brandingFeatureFactoryMock = mock<BrandingFeatureFactory>();
        const brandingFeatureFactoryTokenStub = new InjectionToken<BrandingFeatureFactory>('BrandingFeatureFactoryStub', {
            providedIn: 'root',
            factory: () => brandingFeatureFactoryMock
        });
        const featureFactoryRepository = setupService(FeatureFactoryRepositoryService, {
            providers: [
                { provide: FeatureFactoryMapping, useValue: { [BrandingFeatureId]: brandingFeatureFactoryTokenStub } }
            ]
        });

        // When
        const featureFactory = featureFactoryRepository.getFeatureFactory(BrandingFeatureId);

        // Then
        expect(featureFactory).toBe(brandingFeatureFactoryMock);
    });
});
