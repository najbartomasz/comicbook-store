import { TestBed } from '@angular/core/testing';
import { Route, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home/home-page.component';

describe('AppRoutes', () => {
    const setup = async (routes: Route[]) => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes)
            ]
        });
        return RouterTestingHarness.create();
    };

    test('navigates to / by default', async () => {
        // Given
        const routerHarness = await setup(appRoutes);

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(location.pathname).toBe('/');
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates back to / when navigated to unsupported path', async () => {
        // Given
        const routerHarness = await setup(appRoutes);

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/path');

        // Then
        expect(location.pathname).toBe('/');
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
