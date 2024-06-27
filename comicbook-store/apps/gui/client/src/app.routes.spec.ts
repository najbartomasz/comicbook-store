import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { LoggerFactory as LoggerFactoryToken } from '@lib/logger/logger-factory.injection-token';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { HomePageComponent } from '@ui/pages/home/home-page.component';
import { appConfig } from 'app.config';

describe('Router', () => {
    const setup = async () => {
        const loggerMockFixture = new LoggerMockFixture('LoggingInterceptor');
        TestBed.configureTestingModule(appConfig)
            .overrideProvider(LoggerFactoryToken, { useValue: loggerMockFixture.loggerFactoryMock });
        return { routerHarness: await RouterTestingHarness.create('/') };
    };

    test('navigates to home page by default', async () => {
        // Given
        const { routerHarness } = await setup();

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to home page when invalid path is requested', async () => {
        // Given
        const { routerHarness } = await setup();

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
