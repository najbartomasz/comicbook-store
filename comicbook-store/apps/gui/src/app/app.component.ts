import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppStateMachineService } from './core/app-state-machine';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'cbs-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    readonly #appStateMachine = inject(AppStateMachineService);

    public ngOnInit(): void {
        this.#appStateMachine.start();
    }

    public ngOnDestroy(): void {
        this.#appStateMachine.stop();
    }
}
