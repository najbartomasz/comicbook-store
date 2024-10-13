import { DynamicComponentRef } from './dynamic-component-ref';

describe('DynamicComponentRef', () => {
    test('notifies when closed', () => {
        // Given
        const dynamicComponentRef = new DynamicComponentRef();
        let completeReceived = false;
        dynamicComponentRef.close$.subscribe({
            complete: () => {
                completeReceived = true;
            }
        });

        // When
        dynamicComponentRef.close();

        // Then
        expect(completeReceived).toBe(true);
    });
});
