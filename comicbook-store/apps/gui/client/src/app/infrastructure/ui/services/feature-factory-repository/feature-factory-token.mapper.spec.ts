import { BrandingFeatureFactory } from '@feature/branding/branding.feature-factory.injection-token';
import { BrandingFeatureId } from '@feature/feature-id';
import { featureFactoryTokenMapper } from './feature-factory-token.mapper';

describe('featureFactoryTokenMapper', () => {
    test('provides feature factory tokens', () => {
        // Given, When, Then
        expect(featureFactoryTokenMapper).toStrictEqual({
            [BrandingFeatureId]: BrandingFeatureFactory
        });
    });
});
