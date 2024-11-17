import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FeatureFactoryMapping } from '@di/feature';
import { BrandingFeatureId } from '@feature';
import { setupModule } from '@testing/fixtures';
import { BrandingFeatureFactory } from 'app/_dependency-injection/feature/branding/branding.feature-factory.injection-token';
import { mock } from 'jest-mock-extended';
import { injectFeature } from './feature.injector';

describe('FeatureInjector', () => {
    [
        {
            featureId: BrandingFeatureId,
            FeatureFactory: BrandingFeatureFactory,
            featureDependencies: [
                { provide: HttpClient, useValue: mock<HttpClient>() }
            ]
        } as const
    ].forEach(({ featureId, FeatureFactory, featureDependencies }) => {
        test(`creates only one instance of the feature ${featureId}`, () => {
            // Given
            setupModule({
                providers: [
                    { provide: FeatureFactoryMapping, useValue: { [featureId]: FeatureFactory } },
                    ...featureDependencies
                ]
            });

            // When
            const feature1 = TestBed.runInInjectionContext(() => injectFeature(featureId));
            const feature2 = TestBed.runInInjectionContext(() => injectFeature(featureId));

            // Then
            expect(feature1.id).toBe(featureId);
            expect(feature1).toBe(feature2);
        });
    });
});
