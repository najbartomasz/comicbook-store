import { RouterTestingHarness } from '@angular/router/testing';
import { setupModule } from '@testing/fixtures';
import { HomePageComponent } from '@ui/views/pages';
import { appConfig } from 'app.config';

describe('Router', () => {
    test('navigates to home page by default', async () => {
        // Given
        setupModule({ ...appConfig });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to home page when invalid path is requested', async () => {
        // Given
        setupModule({ ...appConfig });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
