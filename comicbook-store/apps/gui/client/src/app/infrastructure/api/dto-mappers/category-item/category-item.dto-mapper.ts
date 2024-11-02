import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { CategoryItem } from '@core/models/category-item.model';
import { CategoryItemDtoMapper as DtoMapper } from './category-item.dto-mapper.model';

export class CategoryItemDtoMapper implements DtoMapper {
    public fromDto(dto: CategoryItemDto[]): CategoryItem[] {
        return dto.map((item) => ({ ...item }));
    }

    public toDto(name: CategoryItem['name']): Pick<CategoryItemDto, 'name'> {
        return { name };
    }
}
