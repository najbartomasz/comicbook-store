import { DynamicDialogRef } from './dynamic-dialog-ref';

describe('DynamicDialogRef', () => {
    test('emits close event', () => {
        // Given
        const dynamicDialogRef = new DynamicDialogRef();
        let isClosed = false;
        dynamicDialogRef.closed$.subscribe(() => {
            isClosed = true;
        });

        // When
        dynamicDialogRef.close();

        // Then
        expect(isClosed).toBe(true);
    });
});
