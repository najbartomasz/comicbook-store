import { IncrementalCounter } from './incremental-counter';

describe('IncrementalCounter', () => {
    test('increments value on each call', () => {
        // Given
        const counter = new IncrementalCounter();

        // When, Then
        expect(counter.nextValue).toBe(1);
        expect(counter.nextValue).toBe(2);
        expect(counter.nextValue).toBe(3);
    });
});
