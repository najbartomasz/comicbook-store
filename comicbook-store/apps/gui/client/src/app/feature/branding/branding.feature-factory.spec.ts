import { mock } from 'jest-mock-extended';
import { BrandingRepository } from './branding-repository.model';
import { BrandingFeature } from './branding.feature';
import { BrandingFeatureFactory } from './branding.feature-factory';

describe('BrandingFeatureFactory', () => {
    test('creates BrandingFeature', () => {
        // Given
        const brandingRepositoryMock = mock<BrandingRepository>();
        const brandingFeatureFactory = new BrandingFeatureFactory(brandingRepositoryMock);
        const expectedFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        const brandingFeature = brandingFeatureFactory.create();

        // Then
        expect(brandingFeature).toStrictEqual(expectedFeature);
    });

    test('creates only one instance of BrandingFeature', () => {
        // Given
        const brandingRepositoryMock = mock<BrandingRepository>();
        const brandingFeatureFactory = new BrandingFeatureFactory(brandingRepositoryMock);

        // When
        const brandingFeature1 = brandingFeatureFactory.create();
        const brandingFeature2 = brandingFeatureFactory.create();

        // Then
        expect(brandingFeature1).toBe(brandingFeature2);
    });
});
