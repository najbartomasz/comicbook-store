import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { LoggerFactory } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { HomePageComponent } from '@ui/view/home-page/home-page.component';
import { appConfig } from 'config/app.config';

describe('Router', () => {
    const setup = async () => {
        TestBed.configureTestingModule(appConfig)
            .overrideProvider(LoggerFactory, { useValue: LoggerMockFixture.loggerFactory });
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
