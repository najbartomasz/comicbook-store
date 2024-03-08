import { AppStateTransitionEvent } from './app-state-transition-event';

export class UnsupportedTransitionEventError extends Error {
    public constructor(event: AppStateTransitionEvent) {
        super(`Event ${event} is unsupported for current state.`);
    }
}
