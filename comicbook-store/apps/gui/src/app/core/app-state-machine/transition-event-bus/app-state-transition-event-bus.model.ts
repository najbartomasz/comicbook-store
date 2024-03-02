import { Observable } from 'rxjs';
import { AppStateTransitionEvent } from '../app-state-transition-event';
import { AppStateTransitionEventDispatcher } from './app-state-transition-event-dispatcher.model';

export interface AppStateTransitionEventBus extends AppStateTransitionEventDispatcher {
    transitionEvent$: Observable<AppStateTransitionEvent>;
}
