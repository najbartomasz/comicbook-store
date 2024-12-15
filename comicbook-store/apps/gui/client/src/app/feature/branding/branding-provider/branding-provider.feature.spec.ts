import { CategoryItem } from '@core/models';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingRepository } from '../branding-repository.model';
import { BrandingProviderFeature } from './branding-provider.feature';

describe('BrandingProviderFeature', () => {
    test('has defined id', () => {
        // Given
        const brandingProviderFeature = new BrandingProviderFeature(mock<BrandingRepository>());

        // When, Then
        expect(brandingProviderFeature.id).toBe('BrandingProviderFeature');
    });

    test('provides all brandings', () => {
        // Given
        const brandingsRepositoryMock = mock<BrandingRepository>();
        brandingsRepositoryMock.getAllBrandings
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }]), asyncScheduler));
        const brandingProviderFeature = new BrandingProviderFeature(brandingsRepositoryMock);

        // When
        let receivedBrandings: CategoryItem[] | undefined;
        brandingProviderFeature.getAllBrandings().subscribe((brandings) => {
            receivedBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);
    });
});
