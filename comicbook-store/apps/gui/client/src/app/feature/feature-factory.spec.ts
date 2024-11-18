import { FactoryStrategy } from '@core/models';
import { mock } from 'jest-mock-extended';
import { BrandingRepository } from './branding/branding-repository.model';
import { BrandingFeature, BrandingFeatureId } from './branding/branding.feature';
import { BrandingFeatureFactory } from './branding/branding.feature-factory';
import { FeatureFactory } from './feature-factory';
import { FeatureFactoryRepository } from './feature-factory-repository.model';

describe('FeatureFactory', () => {
    [
        {
            featureId: BrandingFeatureId,
            ConcreteFeatureFactory: BrandingFeatureFactory,
            featureDependencies: [mock<BrandingRepository>()]
        } as const
    ].forEach(({ featureId, ConcreteFeatureFactory, featureDependencies }) => {
        test(`creates the feature ${featureId}`, () => {
            // Given
            const factoryStartegyMock = mock<FactoryStrategy<BrandingFeature>>();
            factoryStartegyMock.create.mockImplementation((createObject) => createObject())
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
