import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetBrandingsFeature } from '@feature/branding/get-brandings.feature.injection-token';
import { injectLogger } from '@lib/logger/logger.injector';
import { AddNewCategoryItemFormComponent } from '@ui/views/components/add-new-category-item-form/add-new-category-item-form.component';
import { CategoryItemListingComponent } from '@ui/views/components/category-item-listing/category-item-listing.component';
import {
    DynamicSlidingPanelComponentFactoryService
} from '@ui/views/components/dynamic-sliding-panel/dynamic-sliding-panel-component-factory.service';
import { DynamicSlidingPanelComponent } from '@ui/views/components/dynamic-sliding-panel/dynamic-sliding-panel.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [CategoryItemListingComponent, DynamicSlidingPanelComponent],
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected readonly categoryItems = toSignal(inject(GetBrandingsFeature).getAllBrandings());
    protected readonly item = viewChild.required<ElementRef<HTMLElement>>('item');

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
