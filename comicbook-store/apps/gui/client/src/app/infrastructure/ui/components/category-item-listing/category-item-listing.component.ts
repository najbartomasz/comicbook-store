import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CategoryItem } from '@core/models/category-item.model';
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
    public readonly categoryItems = input.required<CategoryItem[]>();
}
