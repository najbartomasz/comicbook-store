import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoggerFactoryService } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                RouterTestingModule
            ],
            providers: [
                { provide: LoggerFactoryService, useValue: LoggerMockFixture.loggerFactory }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    });

    test('is created', () => {
        // Given, When, Then
        expect(fixture.componentInstance).toBeTruthy();
    });
});
