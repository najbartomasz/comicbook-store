import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectLogger } from '@ui/logger/logger.injector';
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
