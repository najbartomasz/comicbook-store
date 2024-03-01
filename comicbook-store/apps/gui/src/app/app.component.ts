import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createAppStateMachine } from './core/app-state-machine/app-state-machine';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'cbs-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    readonly #appStateMachine = createAppStateMachine();

    public ngOnInit(): void {
        this.#appStateMachine.start();
    }

    public ngOnDestroy(): void {
        this.#appStateMachine.stop();
    }
}
