import { AppStateTransitionEvent } from '../app-state-transition-event';
import { UnsupportedAppStateTransitionEventError } from './unsupported-app-state-transition-event.error';

describe('UnsupportedAppStateTransitionEventError', () => {
    test('defines error message', () => {
        // Given, When
        const error = new UnsupportedAppStateTransitionEventError(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(error.message).toBe('Event unauthenticated is unsupported in current state.');
    });
});
