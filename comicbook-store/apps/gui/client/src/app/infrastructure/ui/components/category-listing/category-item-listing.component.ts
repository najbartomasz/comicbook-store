import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';

@Component({
    selector: 'cbs-category-item-listing',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './category-item-listing.component.html',
    styleUrl: './category-item-listing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemListingComponent {
    public categoryItems = input.required<ComicBookCategoryItem[]>();
}
