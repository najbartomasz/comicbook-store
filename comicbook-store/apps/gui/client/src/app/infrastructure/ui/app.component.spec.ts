import { TestBed } from '@angular/core/testing';
import { LoggerFactoryService } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const setup = async (loggerFactoryMock: LoggerFactoryService) => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent
            ],
            providers: [
                { provide: LoggerFactoryService, useValue: loggerFactoryMock }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
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
        fixture.destroy();

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
