import { MockProxy, mock } from 'jest-mock-extended';
import { createAppStateMachine } from './app-state-machine';
import * as appStateMachineActorModule from './app-state-machine-actor';

describe('AppStateMachine', () => {
    let appStateMachine: ReturnType<typeof createAppStateMachine>;

    let appStateMachineActorMock: MockProxy<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>;

    beforeEach(() => {
        appStateMachineActorMock = mock<ReturnType<typeof appStateMachineActorModule.createAppStateMachineActor>>();
        jest.spyOn(appStateMachineActorModule, 'createAppStateMachineActor').mockReturnValueOnce(appStateMachineActorMock);
        appStateMachine = createAppStateMachine();
    });

    test('starts app state machine actor', () => {
        // Given, When
        appStateMachine.start();

        // When, Then
        expect(appStateMachineActorMock.start).toHaveBeenCalledTimes(1);
    });

    test('stops app state machine actor', () => {
        // Given, When
        appStateMachine.stop();

        // When, Then
        expect(appStateMachineActorMock.stop).toHaveBeenCalledTimes(1);
    });
});
