import { InjectionToken } from '@angular/core';
import { CategoryItemDtoMapper as DtoMapper } from '@api/mapper/category-item/category-item.dto-mapper';
import { CategoryItemDtoMapper as CategoryItemDtoMapperInterface } from '@api/mapper/category-item/category-item.dto-mapper.interface';

export const CategoryItemDtoMapper = new InjectionToken<CategoryItemDtoMapperInterface>('CategoryItemDtoMapper', {
    providedIn: 'root',
    factory: () => new DtoMapper()
});
