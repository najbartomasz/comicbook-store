import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrandingController } from '@api/controllers/branding/branding.controller';
import { BrandingFeature } from '@feature/branding/branding.feature';
import { BrandingFeatureId } from '@feature/feature-id';
import { setupModule } from '@test/fixtures/setup/setup-module.fixture';
import { mock } from 'jest-mock-extended';
import { injectFeature } from './feature.injector';

describe('FeatureInjector', () => {
    test('creates feature', () => {
        // Given
        setupModule({
            providers: [
                { provide: HttpClient, useValue: mock<HttpClient>() }
            ]
        });
        const expectedFeature = new BrandingFeature(mock<BrandingController>());

        // When
        const feature = TestBed.runInInjectionContext(() => injectFeature(BrandingFeatureId));

        // Then
        expect(feature).toStrictEqual(expectedFeature);
    });
});
