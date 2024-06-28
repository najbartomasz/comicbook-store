import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectLogger } from '@lib/logger/logger.injector';
@Component({
    standalone: true,
    imports: [RouterOutlet],
    selector: 'cbs-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
