import { DynamicComponentRef } from './dynamic-component-ref';

describe('DynamicComponentRef', () => {
    test('provides value when closed with value', () => {
        // Given
        const dynamicComponentRef = new DynamicComponentRef();
        let receivedValue: unknown;
        dynamicComponentRef.close$.subscribe((value) => {
            receivedValue = value;
        });

        // When
        dynamicComponentRef.close('test');

        // Then
        expect(receivedValue).toBe('test');
    });

    test('does not provide value when closed without value', () => {
        // Given
        const dynamicComponentRef = new DynamicComponentRef();
        let receivedValue: unknown;
        dynamicComponentRef.close$.subscribe((value) => {
            receivedValue = value;
        });

        // When
        dynamicComponentRef.close();

        // Then
        expect(receivedValue).toBeUndefined();
    });
});
