import { ChangeDetectionStrategy, Component, inject, ResourceRef } from '@angular/core';
import { CategoryItem } from '@core/models';
import { injectLogger } from '@ui/injectors';
import { DynamicSlidingPanelComponentFactoryService } from '@ui/services';
import { AddNewCategoryItemFormComponent, CategoryItemListingComponent } from '@ui/views/components';
import { finalize } from 'rxjs';
import { CategoryItemProviderService } from './category-item-provider.service';

@Component({
    selector: 'cbs-home-page',
    imports: [CategoryItemListingComponent],
    providers: [CategoryItemProviderService],
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected get categoryItems(): ResourceRef<CategoryItem[]> { return this.#categoryItemProviderService.categoryItems; }

    readonly #logger = injectLogger('HomePageComponent');
    readonly #categoryItemProviderService = inject(CategoryItemProviderService);
    readonly #dynamicSlidingPanelFactory = inject(DynamicSlidingPanelComponentFactoryService);

    protected addNewCategoryItem(): void {
        const dynamicComponentRef = this.#dynamicSlidingPanelFactory.create(AddNewCategoryItemFormComponent);
        this.#logger.info('Add new category item form opened.');
        dynamicComponentRef.close$
            .pipe(
                finalize(() => {
                    this.#logger.info('Add new category item form closed.');
                })
            )
            .subscribe();
    }
}
