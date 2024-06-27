import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { CategoryItemComponent } from './category-item/category-item.component';

@Component({
    selector: 'cbs-category-item-listing',
    standalone: true,
    imports: [CategoryItemComponent],
    templateUrl: './category-item-listing.component.html',
    styleUrl: './category-item-listing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemListingComponent {
    public categoryItems = input.required<ComicBookCategoryItem[]>();
}
