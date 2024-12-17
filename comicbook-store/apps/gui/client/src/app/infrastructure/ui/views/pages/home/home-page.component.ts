import { ChangeDetectionStrategy, Component, inject, ResourceRef } from '@angular/core';
import { CategoryItem } from '@core/models';
import { CategoryItemListingComponent } from '@ui/views/components';
import { AddNewCategoryItemPanelService } from './add-new-category-item-panel.service';
import { CategoryItemProviderService } from './category-item-provider.service';

@Component({
    selector: 'cbs-home-page',
    templateUrl: './home-page.component.html',
    imports: [CategoryItemListingComponent],
    providers: [CategoryItemProviderService, AddNewCategoryItemPanelService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected get categoryItems(): ResourceRef<CategoryItem[]> { return this.#categoryItemProvider.categoryItems; }

    readonly #categoryItemProvider = inject(CategoryItemProviderService);
    readonly #addNewCategoryItemPanel = inject(AddNewCategoryItemPanelService);

    protected addNewCategoryItem(): void {
        this.#addNewCategoryItemPanel.open();
    }
}
