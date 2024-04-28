import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { Observable } from 'rxjs';

export interface GetBrandingDetailsUseCase {
    getBrandingDetails(id: ComicBookBranding['id']): Observable<ComicBookBrandingDetails>;
}
