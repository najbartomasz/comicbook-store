import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { BrandingFeature } from '@features/branding/branding.feature';
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

    readonly #brandingFeature = inject(BrandingFeature);

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
