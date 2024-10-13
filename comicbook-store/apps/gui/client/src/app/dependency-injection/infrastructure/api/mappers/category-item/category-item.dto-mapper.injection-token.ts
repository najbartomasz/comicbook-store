import { InjectionToken } from '@angular/core';
import { CategoryItemDtoMapper as DtoMapper } from '@api/dto-mappers/category-item/category-item.dto-mapper';
import { CategoryItemDtoMapper as CategoryItemDtoMapperInterface } from '@api/dto-mappers/category-item/category-item.dto-mapper.interface';

export const CategoryItemDtoMapper = new InjectionToken<CategoryItemDtoMapperInterface>('CategoryItemDtoMapper', {
    providedIn: 'root',
    factory: () => new DtoMapper()
});
