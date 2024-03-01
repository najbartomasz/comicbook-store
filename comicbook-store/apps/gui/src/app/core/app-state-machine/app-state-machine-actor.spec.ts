import { createAppStateMachineActor } from './app-state-machine-actor';
import { AppStateTransitionEvent } from './app-state-transition-event';

describe('AppStateMachineActor', () => {
    let appStateMachineActor: ReturnType<typeof createAppStateMachineActor>;

    beforeEach(() => {
        appStateMachineActor = createAppStateMachineActor().start();
    });

    test('is initially in start state', () => {
        // Given, When
        const stateTags = appStateMachineActor.getSnapshot().tags;

        // Then
        expect(stateTags).toContain('start');
    });

    test('transitions from start to login state on unauthenticated event', () => {
        // Given, When
        appStateMachineActor.send({ type: AppStateTransitionEvent.Unauthenticated });
        const stateTags = appStateMachineActor.getSnapshot().tags;

        // Then
        expect(stateTags).toContain('login');
    });
});
