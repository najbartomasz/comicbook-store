import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { Observable } from 'rxjs';

export interface GetBrandingDetailsUseCase {
    getBrandingDetails(id: ComicBookCategoryItem['id']): Observable<ComicBookCategoryItemDetails>;
}
