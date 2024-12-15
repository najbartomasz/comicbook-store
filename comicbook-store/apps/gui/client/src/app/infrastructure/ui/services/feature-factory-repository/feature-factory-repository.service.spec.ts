import { InjectionToken } from '@angular/core';
import { FeatureFactoryMapping } from '@di/feature';
import { BrandingProviderFeatureFactory, BrandingProviderFeatureId } from '@feature';
import { setupService } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { FeatureFactoryRepositoryService } from './feature-factory-repository.service';

describe('FeatureFactoryRepository', () => {
    test('provides feature factory for requested feature', () => {
        // Given
        const brandingProviderFeatureFactoryMock = mock<BrandingProviderFeatureFactory>();
        const brandingProviderFeatureFactoryTokenStub = new InjectionToken<BrandingProviderFeatureFactory>(
            'BrandingProviderFeatureFactoryStub',
            {
                providedIn: 'root',
                factory: () => brandingProviderFeatureFactoryMock
            }
        );
        const featureFactoryRepository = setupService(FeatureFactoryRepositoryService, {
            providers: [
                { provide: FeatureFactoryMapping, useValue: { [BrandingProviderFeatureId]: brandingProviderFeatureFactoryTokenStub } }
            ]
        });

        // When
        const featureFactory = featureFactoryRepository.getFeatureFactory(BrandingProviderFeatureId);

        // Then
        expect(featureFactory).toBe(brandingProviderFeatureFactoryMock);
    });
});
