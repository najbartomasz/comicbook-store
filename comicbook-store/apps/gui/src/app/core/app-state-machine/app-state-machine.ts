import { Subject, merge, partition, takeUntil, tap } from 'rxjs';
import { LoggerFactoryService } from '../logger';
import { createAppStateMachineActor } from './app-state-machine-actor';
import { createAppStateTransitionEventBus } from './transition-event-bus/app-state-transition-event-bus';

export const createAppStateMachine = (loggerFactoryService: LoggerFactoryService) => {
    const logger = loggerFactoryService.createLogger('AppStateMachine');
    const actor = createAppStateMachineActor();
    const actorStopped$ = new Subject<void>();
    const { transitionEvent$ } = createAppStateTransitionEventBus();

    return {
        start: (): void => {
            const [supportedEvent$, unsupportedEvent$] = partition(transitionEvent$, (event) => actor.getSnapshot().can({ type: event }));
            const supportedTransition$ = supportedEvent$
                .pipe(
                    tap((event) => {
                        const currentState = actor.getSnapshot().value;
                        actor.send({ type: event });
                        logger.warn(`Changed state from ${currentState} to ${actor.getSnapshot().value} on ${event}.`);
                    })
                );
            const unsupportedTransition$ = unsupportedEvent$
                .pipe(
                    tap((event) => {
                        logger.error(
                            `Cannot change state from ${actor.getSnapshot().value}.`,
                            new Error(`Event ${event} is unsupported for current state.`)
                        );
                    })
                );

            merge(unsupportedTransition$, supportedTransition$)
                .pipe(takeUntil(actorStopped$))
                .subscribe();

            actor.start();
            logger.info('State machine started.');
        },
        stop: (): void => {
            actor.stop();

            actorStopped$.next();
            actorStopped$.complete();
            logger.info('State machine stopped.');
        }
    };
};
