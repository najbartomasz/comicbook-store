import { RouterTestingHarness } from '@angular/router/testing';
import { setup } from '@test/fixtures/setup/setup.module';
import { HomePageComponent } from '@ui/views/pages/home/home-page.component';
import { appConfig } from 'app.config';

describe('Router', () => {
    test('navigates to home page by default', async () => {
        // Given
        setup({ ...appConfig });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to home page when invalid path is requested', async () => {
        // Given
        setup({ ...appConfig });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
