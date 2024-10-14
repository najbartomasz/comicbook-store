import { DynamicComponentRef } from './dynamic-component-ref';

describe('DynamicComponentRef', () => {
    test('notifies when closed', () => {
        // Given
        const dynamicComponentRef = new DynamicComponentRef();
        let receivedData: unknown;
        let completeReceived = false;
        dynamicComponentRef.close$.subscribe({
            next: (value) => {
                receivedData = value;
            },
            complete: () => {
                completeReceived = true;
            }
        });

        // When
        dynamicComponentRef.close('data');

        // Then
        expect(receivedData).toBe('data');
        expect(completeReceived).toBe(true);
    });
});
