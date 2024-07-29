import { RouterTestingHarness } from '@angular/router/testing';
import { LoggerFactory as LoggerFactoryToken } from '@lib/logger/logger-factory.injection-token';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { setup } from '@test/fixtures/setup/setup.module';
import { HomePageComponent } from '@ui/pages/home/home-page.component';
import { appConfig } from 'app.config';

describe('Router', () => {
    test('navigates to home page by default', async () => {
        // Given
        const { loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const { providers, ...config } = appConfig;
        setup({
            ...config,
            providers: [
                ...providers,
                { provide: LoggerFactoryToken, useValue: loggerFactoryMock }
            ]
        });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });

    test('navigates to home page when invalid path is requested', async () => {
        // Given
        const { loggerFactoryMock } = new LoggerMockFixture('LoggingInterceptor');
        const { providers, ...config } = appConfig;
        setup({
            ...config,
            providers: [
                ...providers,
                { provide: LoggerFactoryToken, useValue: loggerFactoryMock }
            ]
        });
        const routerHarness = await RouterTestingHarness.create('/');

        // When
        const activatedComponent = await routerHarness.navigateByUrl('/invalid/path');

        // Then
        expect(activatedComponent).toBeInstanceOf(HomePageComponent);
    });
});
