import { setup } from '@test/fixtures/setup/setup.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('is up and running', async () => {
        // Given
        const { loggerMock } = await setup(AppComponent);

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', async () => {
        // Given
        const { fixture, loggerMock } = await setup(AppComponent);

        // When
        fixture.destroy();

        // Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
