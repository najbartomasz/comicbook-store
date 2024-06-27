import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';

@Component({
    selector: 'cbs-category-item',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './category-item.component.html',
    styleUrl: './category-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent {
    public item = input.required<ComicBookCategoryItem>();
}
