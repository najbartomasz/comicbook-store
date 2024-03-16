import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerFactoryService } from '@lib/logger';
import { LoggerMockFixture } from '@test/fixtures/logger-mock/logger-mock.fixture';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent
            ],
            providers: [
                {
                    provide: LoggerFactoryService,
                    useValue: LoggerMockFixture.loggerFactory
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    test('is created', () => {
        // Given, When, Then
        expect(fixture.componentInstance).toBeTruthy();
    });
});
