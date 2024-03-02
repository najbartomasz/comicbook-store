import { AppStateTransitionEvent } from '../app-state-transition-event';
import { createAppStateTransitionEventBus } from './app-state-transition-event-bus';

describe('AppStateTransitionEventBus', () => {
    test('creates single instance of event bus', () => {
        // Given, When
        const eventBusInstance1 = createAppStateTransitionEventBus();
        const eventBusInstance2 = createAppStateTransitionEventBus();
        const eventBusInstance3 = createAppStateTransitionEventBus();

        // Then
        expect(eventBusInstance2).toBe(eventBusInstance1);
        expect(eventBusInstance3).toBe(eventBusInstance1);
    });

    test('dispatches app state transition events to subscribers', () => {
        // Given
        const eventBusInstance1 = createAppStateTransitionEventBus();
        const eventBusInstance2 = createAppStateTransitionEventBus();
        let receivedEvent: AppStateTransitionEvent | undefined;
        eventBusInstance2.transitionEvent$.subscribe((event) => {
            receivedEvent = event;
        });

        // When
        eventBusInstance1.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(receivedEvent).toBe(AppStateTransitionEvent.Unauthenticated);
    });
});
