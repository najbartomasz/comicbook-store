import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetBrandingsFeature } from '@feature/branding/get-brandings.feature.injection-token';
import { CategoryItemListingComponent } from '@ui/views/components/category-item-listing/category-item-listing.component';
import {
    DynamicAddNewCategoryItemFormComponent
} from '@ui/views/components/dynamic-add-new-category-item-form/dynamic-add-new-category-item-form.component';
import {
    DynamicSlidingPanelComponentFactoryService
} from '@ui/views/components/dynamic-sliding-panel/dynamic-sliding-panel-component-factory.service';
import { DynamicSlidingPanelComponent } from '@ui/views/components/dynamic-sliding-panel/dynamic-sliding-panel.component';

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

    readonly #dynamicSlidingPanelFactory = inject(DynamicSlidingPanelComponentFactoryService);

    protected addNewCategoryItem(): void {
        this.#dynamicSlidingPanelFactory.create(DynamicAddNewCategoryItemFormComponent);
    }
}
