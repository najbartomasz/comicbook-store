import { CategoryItemDto } from '@api';
import { CategoryItem, FromDtoMapper, ToDtoMapper } from '@core/models';

export type CategoryItemDtoMapper =
    & FromDtoMapper<CategoryItemDto[], CategoryItem[]>
    & ToDtoMapper<CategoryItem['name'], Pick<CategoryItemDto, 'name'>>;
