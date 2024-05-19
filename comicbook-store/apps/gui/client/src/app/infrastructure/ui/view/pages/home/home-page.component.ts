import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { CategoryItemListingComponent } from '@ui/view/components/category-listing/category-item-listing.component';
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
        inject(GetBrandingsUseCaseToken).getBrandings(),
        { initialValue: [] }
    );
}
