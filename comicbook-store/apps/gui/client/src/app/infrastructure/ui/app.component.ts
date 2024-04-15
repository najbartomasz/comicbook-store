import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectLogger } from '@lib/logger';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'cbs-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    readonly #logger = injectLogger('AppComponent');

    public ngOnInit(): void {
        this.#logger.info('Up and running.');
    }

    public ngOnDestroy(): void {
        this.#logger.info('Closed.');
    }
}
