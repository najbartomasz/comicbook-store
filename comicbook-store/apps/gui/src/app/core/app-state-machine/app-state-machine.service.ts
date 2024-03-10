import { Injectable, inject } from '@angular/core';
import { Subject, merge, partition, takeUntil, tap } from 'rxjs';
import { injectLogger } from '../logger/logger.injector';
import { createAppStateMachineActor } from './app-state-machine-actor';
import { AppStateTransitionEventBusService } from './transition-event-bus/app-state-transition-event-bus.service';
import { UnsupportedAppStateTransitionEventError } from './transition-error/unsupported-app-state-transition-event.error';

@Injectable({
    providedIn: 'root'
})
export class AppStateMachineService {
    readonly #logger = injectLogger('AppStateMachineService');
    readonly #actor = createAppStateMachineActor();
    readonly #transitionEventBus = inject(AppStateTransitionEventBusService);
    readonly #actorStopped = new Subject<void>();

    public start(): void {
        if (this.#isStarted) {
            this.#logger.warn('State machine is already started.');
            return;
        }

        const [supportedEvent$, unsupportedEvent$] = partition(
            this.#transitionEventBus.transitionEvent$,
            (event) => this.#actor.getSnapshot().can({ type: event })
        );
        const supportedTransition$ = supportedEvent$
            .pipe(
                tap((event) => {
                    const currentState = this.#actor.getSnapshot().value;
                    this.#actor.send({ type: event });
                    this.#logger.info(`Changed state from ${currentState} to ${this.#actor.getSnapshot().value} on ${event} event.`);
                })
            );
        const unsupportedTransition$ = unsupportedEvent$
            .pipe(
                tap((event) => {
                    this.#logger.error(
                        `Cannot change state from ${this.#actor.getSnapshot().value}.`, new UnsupportedAppStateTransitionEventError(event)
                    );
                })
            );

        merge(unsupportedTransition$, supportedTransition$)
            .pipe(takeUntil(this.#actorStopped))
            .subscribe();

        this.#actor.start();
        this.#logger.info('State machine started.');
    }

    public stop(): void {
        this.#actor.stop();
        this.#actorStopped.next();
        this.#logger.info('State machine stopped.');
    }

    get #isStarted(): boolean {
        const { value: currentState, status } = this.#actor.getSnapshot();
        return currentState !== 'start' && status === 'active';
    }
}
