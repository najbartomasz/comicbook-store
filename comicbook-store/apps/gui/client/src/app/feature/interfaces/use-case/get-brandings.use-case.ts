import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { Observable } from 'rxjs';

export interface GetBrandingsUseCase {
    getBrandings(): Observable<ComicBookBranding[]>;
}
