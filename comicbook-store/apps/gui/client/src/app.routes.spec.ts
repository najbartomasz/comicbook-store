import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { HomePageComponent } from '@ui/view/home-page/home-page.component';
import { appConfig } from 'app.config';

describe('Router', () => {
    const setup = async () => {
        TestBed.configureTestingModule(appConfig)
            .overrideProvider(LoggerFactoryToken, { useValue: LoggerMockFixture.loggerFactory });
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

    test('navigates to home page when invalid path was requested', async () => {
        // Given
        const routerHarness = await setup();

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
