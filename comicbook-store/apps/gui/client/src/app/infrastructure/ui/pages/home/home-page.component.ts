import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetBrandingsFeature } from '@feature/branding/get-brandings.feature.injection-token';
import { CategoryItemListingComponent } from '@ui/components/category-item-listing/category-item-listing.component';
import { DynamicSlidingPanelComponent } from '@ui/components/dynamic-sliding-panel/dynamic-sliding-panel.component';

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

    protected isPanelVisible = signal(false);
}
