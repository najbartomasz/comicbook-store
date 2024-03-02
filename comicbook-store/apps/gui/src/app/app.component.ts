import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createAppStateMachine } from './core/app-state-machine';
import { LoggerFactoryService } from './core/logger';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'cbs-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    readonly #loggerFactoryService = inject(LoggerFactoryService);
    readonly #appStateMachine = createAppStateMachine(this.#loggerFactoryService);

    public ngOnInit(): void {
        this.#appStateMachine.start();
    }

    public ngOnDestroy(): void {
        this.#appStateMachine.stop();
    }
}
