import { HttpClient } from '@api/http-client/http-client.interface';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingsController } from './brandings-controller';

describe('BrandingsController', () => {
    test('provides list of all comicbook brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings').mockReturnValueOnce(
            scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]), asyncScheduler)
        );
        const brandingsController = new BrandingsController(httpClientMock);

        // When
        let receivedComicbookBrandings: ComicBookCategoryItem[] | undefined;
        brandingsController.getAllBrandings().subscribe((brandings) => {
            receivedComicbookBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedComicbookBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' },
            { id: 2, name: 'MARVEL CLASSIC' }
        ]);
    });
});
