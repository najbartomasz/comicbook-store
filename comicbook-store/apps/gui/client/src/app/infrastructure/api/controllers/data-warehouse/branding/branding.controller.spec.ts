import { CategoryItemDto, CategoryItemDtoMapper } from '@api/dto';
import { CategoryItem, HttpClient } from '@core/models';
import { mock } from 'jest-mock-extended';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { BrandingController } from './branding.controller';

describe('BrandingController', () => {
    test('provides list of all brandings', () => {
        // Given
        const httpClientMock = mock<HttpClient>();
        httpClientMock.get
            .calledWith('/data-warehouse/brandings')
            .mockReturnValueOnce(scheduled(of([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]), asyncScheduler));
        const categoryItemDtoMapperMock = mock<CategoryItemDtoMapper>();
        categoryItemDtoMapperMock.fromDto
            .calledWith(expect.arrayContaining([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]) as CategoryItemDto[])
            .mockReturnValueOnce([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'MARVEL CLASSIC' }]);
        const brandingController = new BrandingController(httpClientMock, categoryItemDtoMapperMock);

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
