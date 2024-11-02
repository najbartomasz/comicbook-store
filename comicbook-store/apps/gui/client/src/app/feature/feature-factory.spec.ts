import { mock } from 'jest-mock-extended';
import { BrandingRepository } from './branding/branding-repository.model';
import { BrandingFeature } from './branding/branding.feature';
import { BrandingFeatureFactory } from './branding/branding.feature-factory';
import { FeatureFactory } from './feature-factory';
import { FeatureFactoryRepository } from './feature-factory-repository.model';
import { BrandingFeatureId } from './feature-id';

describe('FeatureFactory', () => {
    test('creates requested feature', () => {
        // Given
        const featureFactoryRepositoryMock = mock<FeatureFactoryRepository>();
        featureFactoryRepositoryMock.getFeatureFactory.calledWith(BrandingFeatureId)
            .mockReturnValueOnce(new BrandingFeatureFactory(mock<BrandingRepository>()));
        const featureFactory = new FeatureFactory(featureFactoryRepositoryMock);
        const expectedFeature = new BrandingFeature(mock<BrandingRepository>());

        // When
        const feature = featureFactory.create(BrandingFeatureId);

        // Then
        expect(feature).toStrictEqual(expectedFeature);
    });
});
