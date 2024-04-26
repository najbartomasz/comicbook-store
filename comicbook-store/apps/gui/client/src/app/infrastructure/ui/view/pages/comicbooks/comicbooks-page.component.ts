import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';
import { ComicBookBrandingDetails } from '@core/models/comicbook-branding-details.model';
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
    public id = input.required<number>();

    protected readonly brandingDetails = signal<ComicBookBrandingDetails | undefined>(undefined);

    readonly #logger = injectLogger('ComicbooksPageComponent');
    readonly #getBenefitDetailsUseCase = inject(GetBrandingDetailsUseCaseToken);

    public ngOnInit(): void {
        this.#getBenefitDetailsUseCase.getBrandingDetails(this.id())
            .pipe(
                tap((brandingDetails) => {
                    this.brandingDetails.set(brandingDetails);
                })
            )
            .subscribe();
        this.#logger.info(`Initialized with ${JSON.stringify(this.brandingDetails())}.`);
    }
}
