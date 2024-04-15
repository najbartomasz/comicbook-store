import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home/home-page.component';

describe('AppRoutes', () => {
    let routerHarness: RouterTestingHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(appRoutes)
            ]
        });

        routerHarness = await RouterTestingHarness.create();
    });

    test('navigates to / by default', async () => {
        // Given, When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(location.pathname).toBe('/');
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates back to / when navigated to unsupported path', async () => {
        // Given, When
        const activatedComponent = await routerHarness.navigateByUrl('/path');

        // Then
        expect(location.pathname).toBe('/');
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
