import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';
import { tap } from 'rxjs';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [MatGridList, MatGridTile],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    protected readonly brandings = signal<ComicBookBranding[]>([]);

    readonly #brandingFeature = inject(GetBrandingsUseCaseToken);

    public ngOnInit(): void {
        this.#brandingFeature.getBrandings()
            .pipe(
                tap((brandings) => {
                    this.brandings.set(brandings);
                })
            )
            .subscribe();
    }
}
