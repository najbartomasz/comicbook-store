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
            factoryStartegyMock.create
                .mockImplementationOnce((createObject) => createObject())
                .mockImplementationOnce((createObject) => createObject());
            const featureFactory2 = new ConcreteFeatureFactory(factoryStartegyMock, ...featureDependencies);
            const featureFactoryRepositoryMock = mock<FeatureFactoryRepository>();
            featureFactoryRepositoryMock.getFeatureFactory.calledWith(featureId).mockReturnValueOnce(featureFactory2);
            const featureFactory = new FeatureFactory(featureFactoryRepositoryMock);
            const expectedFeature = featureFactory2.create();

            // When
            const feature = featureFactory.create(featureId);

            // Then
            expect(feature).toStrictEqual(expectedFeature);
        });
    });
});
