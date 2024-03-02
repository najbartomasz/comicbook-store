import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { AppComponent } from './app.component';
import * as appStateMachieModule from './core/app-state-machine';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let appStateMachineMock: MockProxy<ReturnType<typeof appStateMachieModule.createAppStateMachine>>;

    beforeEach(async () => {
        appStateMachineMock = mock<ReturnType<typeof appStateMachieModule.createAppStateMachine>>();
        jest.spyOn(appStateMachieModule, 'createAppStateMachine').mockReturnValueOnce(appStateMachineMock);

        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule]
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
