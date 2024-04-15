import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logger, LoggerFactoryService } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { MockProxy } from 'jest-mock-extended';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let loggerMock: MockProxy<Logger>;

    beforeEach(async () => {
        const loggerMockFixture = new LoggerMockFixture('AppComponent');
        loggerMock = loggerMockFixture.logger;

        await TestBed.configureTestingModule({
            imports: [
                AppComponent
            ],
            providers: [
                { provide: LoggerFactoryService, useValue: loggerMockFixture.loggerFactory }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    test('is up and running', () => {
        // Given, When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Up and running.');
    });

    test('is closed', () => {
        // Given
        fixture.destroy();

        // When, Then
        expect(loggerMock.info).toHaveBeenCalledWith('Closed.');
    });
});
