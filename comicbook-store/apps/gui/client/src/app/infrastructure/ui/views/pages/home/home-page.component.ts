import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BrandingFeatureId } from '@feature';
import { injectFeature, injectLogger } from '@ui/injectors';
import { DynamicSlidingPanelComponentFactoryService } from '@ui/services';
import { AddNewCategoryItemFormComponent, CategoryItemListingComponent } from '@ui/views/components';
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
