import { FactoryStrategy } from '@comicbook-store/factory-strategy';
import { mock } from 'jest-mock-extended';
import { BrandingProviderFeature, BrandingProviderFeatureId } from './branding/branding-provider/branding-provider.feature';
import { BrandingProviderFeatureFactory } from './branding/branding-provider/branding-provider.feature-factory';
import { BrandingRepository } from './branding/branding-repository.model';
import { FeatureFactory } from './feature-factory';
import { FeatureFactoryRepository } from './feature-factory-repository.model';

describe('FeatureFactory', () => {
    [
        {
            featureId: BrandingProviderFeatureId,
            ConcreteFeatureFactory: BrandingProviderFeatureFactory,
            featureDependencies: [mock<BrandingRepository>()]
        } as const
    ].forEach(({ featureId, ConcreteFeatureFactory, featureDependencies }) => {
        test(`creates the feature ${featureId}`, () => {
            // Given
            const factoryStartegyMock = mock<FactoryStrategy<BrandingProviderFeature>>();
            factoryStartegyMock.create.mockImplementation((createObject) => createObject());
            const concreteFeatureFactory = new ConcreteFeatureFactory(factoryStartegyMock, ...featureDependencies);
            const featureFactoryRepositoryMock = mock<FeatureFactoryRepository>();
            featureFactoryRepositoryMock.getFeatureFactory.calledWith(featureId).mockReturnValueOnce(concreteFeatureFactory);
            const featureFactory = new FeatureFactory(featureFactoryRepositoryMock);
            const expectedFeature = concreteFeatureFactory.create();

            // When
            const feature = featureFactory.create(featureId);

            // Then
            expect(feature).toStrictEqual(expectedFeature);
        });
    });
});
