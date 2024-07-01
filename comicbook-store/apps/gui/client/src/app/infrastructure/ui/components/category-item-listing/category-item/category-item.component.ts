import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';

@Component({
    selector: 'cbs-category-item',
    standalone: true,
    templateUrl: './category-item.component.html',
    styleUrl: './category-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent {
    public readonly item = input.required<ComicBookCategoryItem>();
}
