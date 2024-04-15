import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
    selector: 'cbs-home-page',
    standalone: true,
    imports: [MatGridList, MatGridTile],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
