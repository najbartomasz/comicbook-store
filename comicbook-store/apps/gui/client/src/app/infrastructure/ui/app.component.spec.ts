import { LoggerFactory } from '@lib/logger/logger-factory.injection-token';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { setup } from '@test/fixtures/setup/setup.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    test('is up and running', async () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('AppComponent');
        await setup(AppComponent, {
            providers: [
                { provide: LoggerFactory, useValue: loggerFactoryMock }
            ]
        });

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', async () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('AppComponent');
        const { fixture } = await setup(AppComponent, {
            providers: [
                { provide: LoggerFactory, useValue: loggerFactoryMock }
            ]
        });

        // When
        fixture.destroy();

        // Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
