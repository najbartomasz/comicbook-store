import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CategoryItem } from '@core/models/category-item.model';
import { NullCategoryItemId } from '@core/models/null-category-item-id.const';
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
    public readonly maxColumns = input.required<number>();
    public readonly addNewCategoryItem = output();

    protected readonly columnsCount = computed(() => Math.min(this.categoryItems().length + 1, this.maxColumns()));
    protected readonly newCategoryItem: CategoryItem = { id: NullCategoryItemId, name: '+' };

    protected onAddNewCategoryItem(): void {
        this.addNewCategoryItem.emit();
    }
}
