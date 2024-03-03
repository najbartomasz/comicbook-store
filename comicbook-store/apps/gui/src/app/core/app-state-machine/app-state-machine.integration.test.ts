import { mock } from 'jest-mock-extended';
import * as xstate from 'xstate';
import { AppStateTransitionEvent, createAppStateMachine, createAppStateTransitionEventBus } from '.';
import { Logger, LoggerFactoryService } from '../logger';

describe('AppStateMachine', () => {
    const eventBus = createAppStateTransitionEventBus();

    let appStateMachine: ReturnType<typeof createAppStateMachine>;
    let xStateActor: ReturnType<typeof xstate.createActor>;

    beforeEach(() => {
        const loggerFactoryServiceMock = mock<LoggerFactoryService>();
        loggerFactoryServiceMock.createLogger.calledWith('AppStateMachine').mockReturnValueOnce(mock<Logger>());
        const xstateCreateActor = xstate.createActor;
        jest.spyOn(xstate, 'createActor').mockImplementation((args) => {
            xStateActor = xstateCreateActor(args);
            return xStateActor;
        });
        appStateMachine = createAppStateMachine(loggerFactoryServiceMock);
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
