import { Subject } from 'rxjs';
import { AppStateTransitionEvent } from '../app-state-transition-event';
import { AppStateTransitionEventBus } from './app-state-transition-event-bus.model';

export const createAppStateTransitionEventBus = (() => {
    const transitionEvent$ = new Subject<AppStateTransitionEvent>();

    const appStateTrasitionEventBus: AppStateTransitionEventBus = {
        transitionEvent$: transitionEvent$.asObservable(),
        dispatch: (event: AppStateTransitionEvent): void => {
            transitionEvent$.next(event);
        }
    };

    return (): AppStateTransitionEventBus => appStateTrasitionEventBus;
})();
