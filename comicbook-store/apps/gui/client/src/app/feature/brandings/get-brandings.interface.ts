import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { Observable } from 'rxjs';

export interface GetBrandings {
    getBrandings(): Observable<ComicBookCategoryItem[]>;
}
