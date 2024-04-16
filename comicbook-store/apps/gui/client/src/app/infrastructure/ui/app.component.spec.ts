import { LoggerFactoryService } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const setup = async (loggerFactoryMock: LoggerFactoryService) => {
        const { fixture } = await render(AppComponent, {
            providers: [
                { provide: LoggerFactoryService, useValue: loggerFactoryMock }
            ]
        });
        return fixture;
    };

    test('is up and running', async () => {
        // Given
        const { logger: loggerMock, loggerFactory } = new LoggerMockFixture('AppComponent');
        await setup(loggerFactory);

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', async () => {
        // Given
        const { logger: loggerMock, loggerFactory } = new LoggerMockFixture('AppComponent');
        const fixture = await setup(loggerFactory);

        // When
        fixture.destroy();

        // Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
