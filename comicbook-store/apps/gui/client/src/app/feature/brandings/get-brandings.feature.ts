import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { Observable } from 'rxjs';
import { BrandingsRepository } from './brandings-repository.interface';
import { GetBrandings } from './get-brandings.interface';

export class GetBrandingsFeature implements GetBrandings {
    readonly #brandingRepository: BrandingsRepository;

    public constructor(brandingsRepository: BrandingsRepository) {
        this.#brandingRepository = brandingsRepository;
    }

    public getBrandings(): Observable<ComicBookCategoryItem[]> {
        return this.#brandingRepository.getAllBrandings();
    }
}
