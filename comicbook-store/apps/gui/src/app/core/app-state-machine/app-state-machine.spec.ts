import { Matcher, MockProxy, mock } from 'jest-mock-extended';
import { createAppStateMachine } from './app-state-machine';
import * as appStateMachineActorModule from './app-state-machine-actor';
import { AppStateTransitionEvent } from './app-state-transition-event';
import { createAppStateTransitionEventBus } from './transition-event-bus/app-state-transition-event-bus';
import { Logger, LoggerFactoryService } from '../logger';

describe('AppStateMachine', () => {
    let appStateMachine: ReturnType<typeof createAppStateMachine>;

    let appStateMachineActorMock: MockProxy<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>;

    beforeEach(() => {
        appStateMachineActorMock = mock<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>();
        jest.spyOn(appStateMachineActorModule, 'createAppStateMachineActor').mockReturnValueOnce(appStateMachineActorMock);
        const loggerFactoryServiceMock = mock<LoggerFactoryService>();
        loggerFactoryServiceMock.createLogger.calledWith('AppStateMachine').mockReturnValueOnce(mock<Logger>());
        appStateMachine = createAppStateMachine(loggerFactoryServiceMock);
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
        const appStateTrasitionEventBus = createAppStateTransitionEventBus();

        // When
        appStateTrasitionEventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(appStateMachineActorMock.send).toHaveBeenCalledTimes(1);
        expect(appStateMachineActorMock.send).toHaveBeenCalledWith({ type: AppStateTransitionEvent.Unauthenticated });
    });

    test('does not transition to next state when received event is supported for current state but machine is stopped', () => {
        // Given
        appStateMachine.start();
        const appStateTrasitionEventBus = createAppStateTransitionEventBus();
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
        const appStateTrasitionEventBus = createAppStateTransitionEventBus();

        // When
        appStateTrasitionEventBus.dispatch(AppStateTransitionEvent.Unauthenticated);

        // Then
        expect(appStateMachineActorMock.send).not.toHaveBeenCalled();
    });
});
