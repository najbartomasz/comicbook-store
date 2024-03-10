import { TestBed } from '@angular/core/testing';
import { AppStateTransitionEvent } from '../app-state-transition-event';
import { AppStateTransitionEventBusService } from './app-state-transition-event-bus.service';

describe('AppStateTransitionEventBusService', () => {
    test('dispatches app state transition events to subscriber', () => {
        // Given
        const dispatcher = TestBed.inject(AppStateTransitionEventBusService);
        const subscriber = TestBed.inject(AppStateTransitionEventBusService);
        const receivedEvents: AppStateTransitionEvent[] = [];
        subscriber.transitionEvent$.subscribe((event) => {
            receivedEvents.push(event);
        });

        // When
        dispatcher.dispatch(AppStateTransitionEvent.Unauthenticated);
        dispatcher.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(receivedEvents).toStrictEqual([AppStateTransitionEvent.Unauthenticated, AppStateTransitionEvent.Unauthenticated]);
    });
});
