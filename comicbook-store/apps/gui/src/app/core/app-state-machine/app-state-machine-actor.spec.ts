import { createAppStateMachineActor } from './app-state-machine-actor';
import { AppStateTransitionEvent } from './app-state-transition-event';

describe('AppStateMachineActor', () => {
    let appStateMachineActor: ReturnType<typeof createAppStateMachineActor>;

    beforeEach(() => {
        appStateMachineActor = createAppStateMachineActor().start();
    });

    test('is initially in start state', () => {
        // Given, When
        const initialState = appStateMachineActor.getSnapshot().value;

        // Then
        expect(initialState).toBe('start');
    });

    test('transitions from start to login state on unauthenticated event', () => {
        // Given, When
        appStateMachineActor.send({ type: AppStateTransitionEvent.Unauthenticated });
        const currentState = appStateMachineActor.getSnapshot().value;

        // Then
        expect(currentState).toBe('login');
    });
});
