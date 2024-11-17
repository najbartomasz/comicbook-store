import { FactoryStrategy } from '@core/models';
import { mock } from 'jest-mock-extended';
import { BrandingRepository } from './branding-repository.model';
import { BrandingFeature } from './branding.feature';
import { BrandingFeatureFactory } from './branding.feature-factory';

describe('BrandingFeatureFactory', () => {
    test('creates BrandingFeature', () => {
        // Given
        const factoryStartegyMock = mock<FactoryStrategy<BrandingFeature>>();
        factoryStartegyMock.create.mockImplementationOnce((createObject) => createObject());
        const brandingRepositoryMock = mock<BrandingRepository>();
        const brandingFeatureFactory = new BrandingFeatureFactory(factoryStartegyMock, brandingRepositoryMock);
        const expectedFeature = new BrandingFeature(brandingRepositoryMock);

        // When
        const brandingFeature = brandingFeatureFactory.create();

        // Then
        expect(brandingFeature).toStrictEqual(expectedFeature);
    });
});
