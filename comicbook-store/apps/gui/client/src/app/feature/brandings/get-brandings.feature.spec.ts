import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingsRepository } from './brandings-repository.interface';
import { GetBrandingsFeature } from './get-brandings.feature';

describe('GetBrandingsFeature', () => {
    test('provides comicbook brandings', () => {
        // Given
        const brandingsRepositoryMock = mock<BrandingsRepository>();
        brandingsRepositoryMock.getAllBrandings
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }]), asyncScheduler));
        const getBrandingsFeature = new GetBrandingsFeature(brandingsRepositoryMock);

        // When
        let receivedComicbookBrandings: ComicBookCategoryItem[] | undefined;
        getBrandingsFeature.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedComicbookBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL NOW! 2.0' }
        ]);
    });
});
