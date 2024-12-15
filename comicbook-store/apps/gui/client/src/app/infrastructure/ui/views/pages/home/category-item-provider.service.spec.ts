import { FeatureFactory as FeatureFactoryToken } from '@di/feature';
import { BrandingProviderFeature, BrandingProviderFeatureId, FeatureFactory } from '@feature';
import { setupService } from '@testing/fixtures';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { CategoryItemProviderService } from './category-item-provider.service';

describe('CategoryItemProvider', () => {
    test('provides all brandings', () => {
        // Given
        const brandingProviderFeatureMock = mock<BrandingProviderFeature>();
        brandingProviderFeatureMock.getAllBrandings.mockReturnValueOnce(scheduled(of([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]), asyncScheduler));
        const featureFactoryMock = mock<FeatureFactory>();
        featureFactoryMock.create.calledWith(BrandingProviderFeatureId).mockReturnValueOnce(brandingProviderFeatureMock);
        const categoryItemProviderService = setupService(CategoryItemProviderService, {
            providers: [
                { provide: FeatureFactoryToken, useValue: featureFactoryMock }
            ]
        });

        // When
        const categoryItems = categoryItemProviderService.categoryItems;
        jest.runAllTimers();

        // Then
        expect(categoryItems.value()).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);
    });
});
