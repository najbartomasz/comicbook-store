import { TestBed } from '@angular/core/testing';
import { Navigation, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { ComicbooksPageComponent } from '@ui/view/pages/comicbooks/comicbooks-page.component';
import { HomePageComponent } from '@ui/view/pages/home/home-page.component';
import { appConfig } from 'app.config';
import { mock } from 'jest-mock-extended';

describe('Router', () => {
    const setup = async (navigationMock = mock<Navigation>()) => {
        TestBed.configureTestingModule(appConfig)
            .overrideProvider(LoggerFactoryToken, { useValue: LoggerMockFixture.loggerFactory });
        const router = TestBed.inject(Router);
        jest.spyOn(router, 'getCurrentNavigation').mockReturnValueOnce(navigationMock);
        return RouterTestingHarness.create('/');
    };

    test('navigates to home page by default', async () => {
        // Given
        const routerHarness = await setup();

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to home page when invalid path is requested', async () => {
        // Given
        const routerHarness = await setup();

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to comicbook branding details page', async () => {
        // Given
        const branding = { name: 'MARVEL FRESH' };
        const routerHarness = await setup(mock<Navigation>({ extras: { state: branding } }));

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/comicbooks/4');

        // Then
        expect(activatedComponent).toBeInstanceOf(ComicbooksPageComponent);
    });
});
