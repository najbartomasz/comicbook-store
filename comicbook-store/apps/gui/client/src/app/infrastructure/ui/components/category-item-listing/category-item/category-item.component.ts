import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CategoryItem } from '@core/models/category-item.model';

@Component({
    selector: 'cbs-category-item',
    standalone: true,
    templateUrl: './category-item.component.html',
    styleUrl: './category-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent {
    public readonly item = input.required<CategoryItem>();
}
