import { InjectionToken } from '@angular/core';
import { BrandingDtoAdapter as DtoAdapter } from '@api/adapters/branding/branding.dto-adapter';
import { DtoAdapter as DtoAdapterInterface } from '@api/adapters/dto-adapter.interface';
import { CategoryItemDto } from '@api/data-transfer-objects/category-item.dto';
import { CategoryItem } from '@core/models/category-item.model';

export const BrandingDtoAdapter = new InjectionToken<DtoAdapterInterface<CategoryItemDto, CategoryItem>>('BrandingsAdapter', {
    providedIn: 'root',
    factory: () => new DtoAdapter()
});
