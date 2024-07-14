import { BrandingDtoAdapter } from './branding.dto-adapter';

describe('BrandingAdapter', () => {
    test('maps from dto', () => {
        // Given
        const brandingAdapter = new BrandingDtoAdapter();

        // When
        const data = brandingAdapter.fromDto({ id: 1, name: 'MARVEL NOW!' });

        // Then
        expect(data).toStrictEqual({ id: 1, name: 'MARVEL NOW!' });
    });
});
