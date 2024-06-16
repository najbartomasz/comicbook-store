import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingsFeature } from '@feature/brandings/get-brandings.feature.injection-token';
import { CategoryItemListingComponent } from '@ui/components/category-listing/category-item-listing.component';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [CategoryItemListingComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected readonly categoryItems = toSignal<ComicBookCategoryItem[], ComicBookCategoryItem[]>(
        inject(GetBrandingsFeature).getBrandings(),
        { initialValue: [] }
    );
}
