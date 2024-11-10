import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrandingController } from '@api';
import { BrandingFeature, BrandingFeatureId } from '@feature';
import { setupModule } from '@testing/fixtures';
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
