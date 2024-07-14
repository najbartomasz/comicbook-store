import { DtoAdapter } from '@api/adapters/dto-adapter.interface';
import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { HttpClient } from '@api/http-client/http-client.interface';
import { CategoryItem } from '@core/models/category-item.model';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingController } from './branding.controller';

describe('BrandingController', () => {
    test('provides list of all brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get
            .calledWith('/brandings')
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]), asyncScheduler));
        const brandingAdapterMock = mock<DtoAdapter<CategoryItemDto, CategoryItem>>();
        brandingAdapterMock.fromDto
            .calledWith(expect.objectContaining({ id: 1, name: 'MARVEL NOW!' }) as CategoryItemDto)
            .mockReturnValueOnce({ id: 1, name: 'MARVEL NOW!' });
        brandingAdapterMock.fromDto
            .calledWith(expect.objectContaining({ id: 2, name: 'MARVEL CLASSIC' }) as CategoryItemDto)
            .mockReturnValueOnce({ id: 2, name: 'MARVEL CLASSIC' });
        const brandingController = new BrandingController(httpClientMock, brandingAdapterMock);

        // When
        let receivedBrandings: CategoryItem[] | undefined;
        brandingController.getAllBrandings().subscribe((brandings) => {
            receivedBrandings = brandings;
        });
        jest.runAllTimers();

        // Then
        expect(receivedBrandings).toStrictEqual([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]);
    });
});
