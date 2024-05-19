import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { Observable } from 'rxjs';

export interface BrandingRepository {
    getBrandings(): Observable<ComicBookCategoryItem[]>;
    getBrandingDetails(id: ComicBookCategoryItem['id']): Observable<ComicBookCategoryItemDetails>;
}
