import { BrandingFeatureFactory } from '@feature/branding/branding.feature-factory';
import { BrandingFeatureId } from '@feature/feature-id';

export interface FeatureFactoryMapper {
   [BrandingFeatureId]: BrandingFeatureFactory;
}
