import { CategoryItem, FromDtoMapper, ToDtoMapper } from '@core/models';
import { CategoryItemDto } from './category-item.dto';

export type CategoryItemDtoMapper =
    & FromDtoMapper<CategoryItemDto[], CategoryItem[]>
    & ToDtoMapper<CategoryItem['name'], Pick<CategoryItemDto, 'name'>>;
