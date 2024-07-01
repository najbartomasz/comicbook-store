import { CategoryItem } from '@core/models/category-item.model';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingsRepository } from './brandings-repository.interface';
import { GetBrandingsFeature } from './get-brandings.feature';

describe('GetBrandingsFeature', () => {
    test('provides brandings', () => {
        // Given
        const brandingsRepositoryMock = mock<BrandingsRepository>();
        brandingsRepositoryMock.getAllBrandings
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }]), asyncScheduler));
        const getBrandingsFeature = new GetBrandingsFeature(brandingsRepositoryMock);

        // When
        let receivedBrandings: CategoryItem[] | undefined;
        getBrandingsFeature.getBrandings().subscribe((brandings) => {
            receivedBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);
    });
});
