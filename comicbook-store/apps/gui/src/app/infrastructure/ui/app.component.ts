import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectLogger } from '@lib/logger';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'cbs-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    readonly #logger = injectLogger('AppComponent');

    public ngOnInit(): void {
        this.#logger.info('Up and running.');
    }
}
