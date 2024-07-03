import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetBrandingsFeature } from '@feature/brandings/get-brandings.feature.injection-token';
import { CategoryItemListingComponent } from '@ui/components/category-item-listing/category-item-listing.component';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [CategoryItemListingComponent],
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected readonly categoryItems = toSignal(inject(GetBrandingsFeature).getBrandings());
}
