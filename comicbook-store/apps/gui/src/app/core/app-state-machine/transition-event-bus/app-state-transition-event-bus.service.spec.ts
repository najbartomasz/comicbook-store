import { TestBed } from '@angular/core/testing';
import { AppStateTransitionEvent } from '../app-state-transition-event';
import { AppStateTransitionEventBusService } from './app-state-transition-event-bus.service';

describe('AppStateTransitionEventBusService', () => {
    test('dispatches app state transition events to subscribers', () => {
        // Given
        const eventBusInstance1 = TestBed.inject(AppStateTransitionEventBusService);
        const eventBusInstance2 = TestBed.inject(AppStateTransitionEventBusService);
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
