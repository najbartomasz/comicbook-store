import { DtoAdapter } from '@api/adapters/dto-adapter.interface';
import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { CategoryItem } from '@core/models/category-item.model';

export class BrandingDtoAdapter implements DtoAdapter<CategoryItemDto, CategoryItem> {
    public fromDto(dto: CategoryItemDto): CategoryItem {
        return dto;
    }
}
