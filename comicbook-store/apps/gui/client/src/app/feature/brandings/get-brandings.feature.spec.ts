import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { mock } from 'jest-mock-extended';
import { of } from 'rxjs';
import { BrandingsRepository } from './brandings-repository.interface';
import { GetBrandingsFeature } from './get-brandings.feature';

describe('GetBrandingsFeature', () => {
    test('provides comicbook brandings', () => {
        // Given
        const comicbookBrandings: ComicBookCategoryItem[] = [
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL NOW! 2.0' }
        ];
        const brandingsRepositoryMock = mock<BrandingsRepository>();
        brandingsRepositoryMock.getAllBrandings.calledWith().mockReturnValueOnce(of(comicbookBrandings));
        const getBrandingsFeature = new GetBrandingsFeature(brandingsRepositoryMock);

        // When
        let receivedComicbookBrandings: ComicBookCategoryItem[] | undefined;
        getBrandingsFeature.getBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });

        // Then
        expect(receivedComicbookBrandings).toStrictEqual(comicbookBrandings);
    });
});
