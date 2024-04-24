import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ComicBookBranding } from '@core/models/comicbook-branding.model';
import { GetBrandingsUseCaseToken } from '@ui/injection-tokens/use-case/branding/branding.use-case.injection-token';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [MatGridList, MatGridTile],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    protected readonly brandings = toSignal<ComicBookBranding[]>(inject(GetBrandingsUseCaseToken).getBrandings());
}
