import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { AppComponent } from './app.component';
import { AppStateMachineService } from './core/app-state-machine';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let appStateMachineMock: MockProxy<AppStateMachineService>;

    beforeEach(async () => {
        appStateMachineMock = mock<AppStateMachineService>();

        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                RouterTestingModule
            ],
            providers: [
                { provide: AppStateMachineService, useValue: appStateMachineMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    });

    test('starts app state machine on init', () => {
        // Given, When
        fixture.detectChanges();

        // Then
        expect(appStateMachineMock.start).toHaveBeenCalledTimes(1);
    });

    test('stops app state machine on destroy', () => {
        // Given
        fixture.detectChanges();

        // When
        fixture.destroy();

        // Then
        expect(appStateMachineMock.stop).toHaveBeenCalledTimes(1);
    });
});
