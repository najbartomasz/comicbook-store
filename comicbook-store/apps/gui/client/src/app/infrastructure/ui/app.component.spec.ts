import { setupComponent } from '@test/fixtures/setup/setup-component.fixture';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('is up and running', async () => {
        // Given
        const { loggerMock } = await setupComponent(AppComponent);

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', async () => {
        // Given
        const { fixture, loggerMock } = await setupComponent(AppComponent);

        // When
        fixture.destroy();

        // Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
