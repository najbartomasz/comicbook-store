import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CategoryItem } from '@core/models/category-item.model';
import { injectLogger } from '@lib/logger/logger.injector';

@Component({
    selector: 'cbs-category-item',
    standalone: true,
    templateUrl: './category-item.component.html',
    styleUrl: './category-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent {
    public readonly item = input.required<CategoryItem>();
    public readonly select = output();

    readonly #logger = injectLogger('CategoryItemComponent');

    protected onCategoryItemSelect(): void {
        this.#logger.info(`Category item ${this.item().name} clicked.`);
        this.select.emit();
    }
}
