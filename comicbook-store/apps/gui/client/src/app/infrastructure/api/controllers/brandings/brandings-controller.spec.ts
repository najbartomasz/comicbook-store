import { HttpClient } from '@api/http-client/http-client.interface';
import { CategoryItem } from '@core/models/category-item.model';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingsController } from './brandings-controller';

describe('BrandingsController', () => {
    test('provides list of all brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get.calledWith('/brandings')
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]), asyncScheduler));
        const brandingsController = new BrandingsController(httpClientMock);

        // When
        let receivedBrandings: CategoryItem[] | undefined;
        brandingsController.getAllBrandings().subscribe((brandings) => {
            receivedBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedBrandings).toStrictEqual([
            { id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }
        ]);
    });
});
