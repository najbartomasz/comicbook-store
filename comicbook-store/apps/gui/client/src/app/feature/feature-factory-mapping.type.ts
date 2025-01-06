import { BrandingProviderFeatureId } from './branding/branding-provider/branding-provider.feature';
import { BrandingProviderFeatureFactory } from './branding/branding-provider/branding-provider.feature-factory';

export interface FeatureFactoryMapping {
   readonly [BrandingProviderFeatureId]: BrandingProviderFeatureFactory;
}
