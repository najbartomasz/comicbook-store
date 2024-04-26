import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { Observable } from 'rxjs';

export interface GetBrandingDetailsUseCase {
    getBrandingDetails(id: number): Observable<ComicBookBranding>;
}
