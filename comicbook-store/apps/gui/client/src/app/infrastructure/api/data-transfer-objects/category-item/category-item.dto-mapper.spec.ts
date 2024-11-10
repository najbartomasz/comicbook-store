import { CategoryItemDto } from '@api';
import { CategoryItemDtoMapper } from './category-item.dto-mapper';

describe('CategoryItemDtoMapper', () => {
    test('maps from dto', () => {
        // Given
        const dto: CategoryItemDto[] = [{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'DC REBIRTH' }];
        const categoryItemDtoMapper = new CategoryItemDtoMapper();

        // When
        const data = categoryItemDtoMapper.fromDto(dto);

        // Then
        expect(data).toStrictEqual([{ id: 1, name: 'MARVEL NOW!' }, { id: 2, name: 'DC REBIRTH' }]);
        expect(data).not.toBe(dto);
    });

    test('maps to dto', () => {
        // Given
        const categoryItemDtoMapper = new CategoryItemDtoMapper();

        // When
        const dto = categoryItemDtoMapper.toDto('MARVEL NOW!');

        // Then
        expect(dto).toStrictEqual({ name: 'MARVEL NOW!' });
    });
});
