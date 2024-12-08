import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CategoryItem, NullNumberId } from '@core/models';
import { CategoryItemComponent } from './category-item/category-item.component';

@Component({
    selector: 'cbs-category-item-listing',
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
    protected readonly newCategoryItem: CategoryItem = { id: NullNumberId, name: '+' };

    protected onAddNewCategoryItem(): void {
        this.addNewCategoryItem.emit();
    }
}
