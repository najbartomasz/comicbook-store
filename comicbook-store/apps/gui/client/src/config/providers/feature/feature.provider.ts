import { Provider } from '@angular/core';
import { provideBrandingFeature } from './branding/branding.feature.provider';

export const provideFeatures = (): Provider[] => [
    provideBrandingFeature()
];
