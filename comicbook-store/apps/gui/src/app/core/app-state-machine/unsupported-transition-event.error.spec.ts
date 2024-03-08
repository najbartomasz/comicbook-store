import { AppStateTransitionEvent } from './app-state-transition-event';
import { UnsupportedTransitionEventError } from './unsupported-transition-event.error';

describe('UnsupportedTransitionEventError', () => {
    test('prints error message', () => {
        // Given, When
        const error = new UnsupportedTransitionEventError(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(error.message).toBe('Event unauthenticated is unsupported for current state.');
    });
});
