import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { BrandingRepository } from '@feature/interfaces/api/branding-repository.interface';
import { GetBrandingDetailsUseCase } from '@feature/interfaces/use-case/get-branding-details.use-case';
import { GetBrandingsUseCase } from '@feature/interfaces/use-case/get-brandings.use-case';
import { Observable } from 'rxjs';

export class BrandingFeature implements GetBrandingsUseCase, GetBrandingDetailsUseCase {
    readonly #brandingRepository: BrandingRepository;

    public constructor(brandingRepository: BrandingRepository) {
        this.#brandingRepository = brandingRepository;
    }

    public getBrandings(): Observable<ComicBookCategoryItem[]> {
        return this.#brandingRepository.getBrandings();
    }

    public getBrandingDetails(id: ComicBookCategoryItem['id']): Observable<ComicBookCategoryItemDetails> {
        return this.#brandingRepository.getBrandingDetails(id);
    }
}
