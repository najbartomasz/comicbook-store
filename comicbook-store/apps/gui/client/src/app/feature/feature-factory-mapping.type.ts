import { BrandingFeatureId } from './branding/branding.feature';
import { BrandingFeatureFactory } from './branding/branding.feature-factory';

export interface FeatureFactoryMapping {
   [BrandingFeatureId]: BrandingFeatureFactory;
}
