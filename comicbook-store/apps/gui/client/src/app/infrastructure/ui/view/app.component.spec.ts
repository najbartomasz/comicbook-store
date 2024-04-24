import { LoggerFactory } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { render } from '@testing-library/angular';
import { LoggerFactoryToken } from '@ui/injection-tokens/lib/logger-factory.injection-token';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const setup = async (loggerFactoryMock: LoggerFactory) => {
        const { fixture } = await render(AppComponent, {
            providers: [
                { provide: LoggerFactoryToken, useValue: loggerFactoryMock }
            ]
        });
        return fixture;
    };

    test('is up and running', async () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('AppComponent');
        await setup(loggerFactoryMock);

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', async () => {
        // Given
        const { loggerMock, loggerFactoryMock } = new LoggerMockFixture('AppComponent');
        const fixture = await setup(loggerFactoryMock);

        // When
        fixture.destroy();

        // Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
