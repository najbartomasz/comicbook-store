import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { Observable } from 'rxjs';

export class BrandingFeature implements GetBrandingsUseCase {
    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingRepository: BrandingRepository) {
        this.#brandingRepository = brandingRepository;
    }

    public getBrandings(): Observable<ComicBookBranding[]> {
        return this.#brandingRepository.getBrandings();
    }
}
