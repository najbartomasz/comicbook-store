import { CategoryItem } from '@core/models/category-item.model';
import { Observable } from 'rxjs';

export interface BrandingRepository {
    getAllBrandings(): Observable<CategoryItem[]>;
}
