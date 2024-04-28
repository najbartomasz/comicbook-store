import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { GetBrandingDetailsUseCase } from '@feature/interfaces/use-case/get-branding-details.use-case';
import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { Observable } from 'rxjs';

export class BrandingFeature implements GetBrandingsUseCase, GetBrandingDetailsUseCase {
    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingRepository: BrandingRepository) {
        this.#brandingRepository = brandingRepository;
    }

    public getBrandings(): Observable<ComicBookBranding[]> {
        return this.#brandingRepository.getBrandings();
    }

    public getBrandingDetails(id: ComicBookBranding['id']): Observable<ComicBookBrandingDetails> {
        return this.#brandingRepository.getBrandingDetails(id);
    }
}
