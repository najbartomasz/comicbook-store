import { AppStateTransitionEvent } from '../app-state-transition-event';

export interface AppStateTransitionEventDispatcher {
    dispatch: (event: AppStateTransitionEvent) => void;
}
