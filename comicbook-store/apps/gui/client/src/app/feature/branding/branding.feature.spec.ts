import { CategoryItem } from '@core/models';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingRepository } from './branding-repository.model';
import { BrandingFeature } from './branding.feature';

describe('BrandingFeature', () => {
    test('has defined id', () => {
        // Given
        const brandingFeature = new BrandingFeature(mock<BrandingRepository>());

        // When, Then
        expect(brandingFeature.id).toBe('BrandingFeature');
    });

    test('provides all brandings', () => {
        // Given
        const brandingsRepositoryMock = mock<BrandingRepository>();
        brandingsRepositoryMock.getAllBrandings
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }]), asyncScheduler));
        const brandingFeature = new BrandingFeature(brandingsRepositoryMock);

        // When
        let receivedBrandings: CategoryItem[] | undefined;
        brandingFeature.getAllBrandings().subscribe((brandings) => {
            receivedBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);
    });
});
