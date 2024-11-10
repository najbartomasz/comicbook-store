import { CategoryItem } from '@core/models';
import { Observable } from 'rxjs';

export interface BrandingRepository {
    getAllBrandings(): Observable<CategoryItem[]>;
}
