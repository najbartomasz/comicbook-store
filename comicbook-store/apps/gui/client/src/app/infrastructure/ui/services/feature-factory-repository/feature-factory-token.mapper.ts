import { BrandingFeatureFactory } from '@feature/branding/branding.feature-factory.injection-token';
import { BrandingFeatureId } from '@feature/feature-id';
import { FeatureFactoryTokenMapper } from './feature-factory-token.mapper.model';

export const featureFactoryTokenMapper: FeatureFactoryTokenMapper = {
    [BrandingFeatureId]: BrandingFeatureFactory
};
