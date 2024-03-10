import { TestBed } from '@angular/core/testing';
import * as xstate from 'xstate';
import {
    AppStateMachineService, AppStateTransitionEvent, AppStateTransitionEventBusService
} from '.';
import { LoggerMockFixture } from '../../../../test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryService } from '../logger/logger-factory.service';

describe('AppStateMachineService', () => {
    let appStateMachine: AppStateMachineService;

    let eventBus: AppStateTransitionEventBusService;
    let xStateActor: ReturnType<typeof xstate.createActor>;

    beforeEach(() => {
        const xstateCreateActor = xstate.createActor;
        jest.spyOn(xstate, 'createActor').mockImplementation((args) => {
            xStateActor = xstateCreateActor(args);
            return xStateActor;
        });

        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryService, useValue: LoggerMockFixture.loggerFactory('AppStateMachineService') }
            ]
        });
        eventBus = TestBed.inject(AppStateTransitionEventBusService);

        appStateMachine = TestBed.inject(AppStateMachineService);
        appStateMachine.start();
    });

    test('is in start state by default', () => {
        // Given, When, Then
        expect(xStateActor.getSnapshot()).toMatchObject({ value: 'start' });
    });

    test('transitions from start to login on unauthenticated event', () => {
        // Given, When
        eventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(xStateActor.getSnapshot()).toMatchObject({ value: 'login' });
    });
});
