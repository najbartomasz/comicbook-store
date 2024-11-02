import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrandingFeatureId } from '@feature/feature-id';
import { injectFeature } from '@feature/feature.injector';
import { injectLogger } from '@lib/logger/logger.injector';
import { AddNewCategoryItemFormComponent } from '@ui/views/components/add-new-category-item-form/add-new-category-item-form.component';
import { CategoryItemListingComponent } from '@ui/views/components/category-item-listing/category-item-listing.component';
import {
    DynamicSlidingPanelComponentFactoryService
} from '@ui/views/components/dynamic-sliding-panel/dynamic-sliding-panel-component-factory.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [CategoryItemListingComponent],
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected readonly categoryItems = toSignal(injectFeature(BrandingFeatureId).getAllBrandings());

    readonly #logger = injectLogger('HomePageComponent');
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
