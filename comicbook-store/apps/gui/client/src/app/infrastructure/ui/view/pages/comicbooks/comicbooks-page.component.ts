import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { ComicBookCategoryItemDetails } from '@core/models/comicbook-category-item-details.model';
import { ComicBookCategoryItem } from '@core/models/comicbook-category-item.model';
import { GetBrandingDetailsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { injectLogger } from '@ui/logger/logger.injector';
import { tap } from 'rxjs';

@Component({
    selector: 'cbs-comicbooks-page',
    standalone: true,
    templateUrl: './comicbooks-page.component.html',
    styleUrl: './comicbooks-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComicbooksPageComponent implements OnInit {
    public id = input.required<ComicBookCategoryItem['id']>();

    protected readonly categoryItemDetails = signal<ComicBookCategoryItemDetails | undefined>(undefined);

    readonly #logger = injectLogger('ComicbooksPageComponent');
    readonly #getBenefitDetailsUseCase = inject(GetBrandingDetailsUseCaseToken);

    public ngOnInit(): void {
        this.#getBenefitDetailsUseCase.getBrandingDetails(this.id())
            .pipe(
                tap((categoryItemDetails) => {
                    this.categoryItemDetails.set(categoryItemDetails);
                    this.#logger.info(`Initialized with ${JSON.stringify(this.categoryItemDetails())}.`);
                })
            )
            .subscribe();
    }
}
