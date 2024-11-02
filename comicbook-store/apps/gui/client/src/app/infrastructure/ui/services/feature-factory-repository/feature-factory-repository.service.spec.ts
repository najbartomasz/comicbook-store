import { BrandingRepository } from '@feature/branding/branding-repository.model';
import { BrandingFeatureFactory } from '@feature/branding/branding.feature-factory';
import { BrandingFeatureFactory as BrandingFeatureFactoryToken } from '@feature/branding/branding.feature-factory.injection-token';
import { BrandingFeatureId } from '@feature/feature-id';
import { setupService } from '@test/fixtures/setup/setup-service.fixture';
import { mock } from 'jest-mock-extended';
import { FeatureFactoryRepositoryService } from './feature-factory-repository.service';
import { FeatureFactoryTokenMapper } from './feature-factory-token.mapper.model';

describe('FeatureFactoryRepository', () => {
    test('provieds feature factory for requested feature', () => {
        // Given
        const featureFactoryTokenMapperMock = mock<FeatureFactoryTokenMapper>();
        featureFactoryTokenMapperMock[BrandingFeatureId] = BrandingFeatureFactoryToken;
        const featureFactoryRepository = setupService(FeatureFactoryRepositoryService, {
            providers: [
                { provide: BrandingFeatureFactoryToken, useValue: new BrandingFeatureFactory(mock<BrandingRepository>()) },
            ]
        });
        const expectedFeatureFactory = new BrandingFeatureFactory(mock<BrandingRepository>());

        // When
        const featureFactory = featureFactoryRepository.getFeatureFactory(BrandingFeatureId);

        // Then
        expect(featureFactory).toStrictEqual(expectedFeatureFactory);
    });
});
