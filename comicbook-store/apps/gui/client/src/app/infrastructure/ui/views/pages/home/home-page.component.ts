import { ChangeDetectionStrategy, Component, inject, ResourceRef } from '@angular/core';
import { CategoryItem } from '@core/models';
import { CategoryItemListingComponent } from '@ui/views/components';
import { CategoryItemProviderService } from './category-item-provider.service';

@Component({
    selector: 'cbs-home-page',
    templateUrl: './home-page.component.html',
    imports: [CategoryItemListingComponent],
    providers: [CategoryItemProviderService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected get categoryItems(): ResourceRef<CategoryItem[]> { return this.#categoryItemProvider.categoryItems; }

    readonly #categoryItemProvider = inject(CategoryItemProviderService);
}
