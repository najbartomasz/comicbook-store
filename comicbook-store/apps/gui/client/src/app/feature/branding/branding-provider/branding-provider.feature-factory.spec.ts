import { FactoryStrategy } from '@comicbook-store/factory-strategy';
import { mock } from 'jest-mock-extended';
import { BrandingRepository } from '../branding-repository.model';
import { BrandingProviderFeature } from './branding-provider.feature';
import { BrandingProviderFeatureFactory } from './branding-provider.feature-factory';

describe('BrandingProviderFeatureFactory', () => {
    test('creates BrandingProviderFeature', () => {
        // Given
        const factoryStartegyMock = mock<FactoryStrategy<BrandingProviderFeature>>();
        factoryStartegyMock.create.mockImplementationOnce((createObject) => createObject());
        const brandingRepositoryMock = mock<BrandingRepository>();
        const brandingProviderFeatureFactory = new BrandingProviderFeatureFactory(factoryStartegyMock, brandingRepositoryMock);
        const expectedFeature = new BrandingProviderFeature(brandingRepositoryMock);

        // When
        const brandingProviderFeature = brandingProviderFeatureFactory.create();

        // Then
        expect(brandingProviderFeature).toStrictEqual(expectedFeature);
    });
});
