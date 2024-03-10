import { AppStateTransitionEvent } from '../app-state-transition-event';

export class UnsupportedAppStateTransitionEventError extends Error {
    public constructor(event: AppStateTransitionEvent) {
        super(`Event ${event} is unsupported in current state.`);
    }
}
