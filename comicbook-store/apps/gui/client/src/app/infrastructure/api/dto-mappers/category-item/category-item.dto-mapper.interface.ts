import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { FromDtoMapper } from '@api/dto-mappers/from.dto-mapper.interface';
import { ToDtoMapper } from '@api/dto-mappers/to.dto-mapper.interface';
import { CategoryItem } from '@core/models/category-item.model';

export type CategoryItemDtoMapper =
    & FromDtoMapper<CategoryItemDto[], CategoryItem[]>
    & ToDtoMapper<CategoryItem['name'], Pick<CategoryItemDto, 'name'>>;
