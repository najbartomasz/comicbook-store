import { TestBed } from '@angular/core/testing';
import { Matcher, MockProxy, mock } from 'jest-mock-extended';
import { LoggerMockFixture } from '../../../../test/fixtures/logger-mock/logger-mock.fixture';
import { LoggerFactoryService } from '../logger/logger-factory.service';
import * as appStateMachineActorModule from './app-state-machine-actor';
import { AppStateMachineService } from './app-state-machine.service';
import { AppStateTransitionEvent } from './app-state-transition-event';
import { AppStateTransitionEventBusService } from './transition-event-bus/app-state-transition-event-bus.service';

describe('AppStateMachineService', () => {
    let appStateMachine: AppStateMachineService;

    let appStateTrasitionEventBus: AppStateTransitionEventBusService;
    let appStateMachineActorMock: MockProxy<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>;

    beforeEach(() => {
        appStateMachineActorMock = mock<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>();
        jest.spyOn(appStateMachineActorModule, 'createAppStateMachineActor').mockReturnValueOnce(appStateMachineActorMock);

        TestBed.configureTestingModule({
            providers: [
                { provide: LoggerFactoryService, useValue: LoggerMockFixture.loggerFactory('AppStateMachineService') }
            ]
        });

        appStateTrasitionEventBus = TestBed.inject(AppStateTransitionEventBusService);
        appStateMachine = TestBed.inject(AppStateMachineService);
    });

    test('transitions to next state when received event is supported for current state', () => {
        // Given
        const getSnapshotMock = mock<ReturnType<typeof appStateMachineActorMock.getSnapshot>>();
        getSnapshotMock.can
            .calledWith(
                expect.objectContaining({ type: AppStateTransitionEvent.Unauthenticated }) as Matcher<{ type: AppStateTransitionEvent }>
            )
            .mockReturnValue(true);
        appStateMachineActorMock.getSnapshot.calledWith().mockReturnValue(getSnapshotMock);
        appStateMachine.start();

        // When
        appStateTrasitionEventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(appStateMachineActorMock.send).toHaveBeenCalledTimes(1);
        expect(appStateMachineActorMock.send).toHaveBeenCalledWith({ type: AppStateTransitionEvent.Unauthenticated });
    });

    test('does not transition to next state when received event is supported for current state but machine is stopped', () => {
        // Given
        appStateMachine.start();
        appStateMachine.stop();

        // When
        appStateTrasitionEventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(appStateMachineActorMock.send).not.toHaveBeenCalled();
    });

    test('does not transition to next state when received event is unsupported for current state', () => {
        // Given
        const getSnapshotMock = mock<ReturnType<typeof appStateMachineActorMock.getSnapshot>>();
        getSnapshotMock.can
            .calledWith(
                expect.objectContaining({ type: AppStateTransitionEvent.Unauthenticated }) as Matcher<{ type: AppStateTransitionEvent }>
            )
            .mockReturnValue(false);
        appStateMachineActorMock.getSnapshot.calledWith().mockReturnValue(getSnapshotMock);
        appStateMachine.start();

        // When
        appStateTrasitionEventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(appStateMachineActorMock.send).not.toHaveBeenCalled();
    });
});
