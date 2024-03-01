import { createAppStateMachineActor } from './app-state-machine-actor';

export const createAppStateMachine = () => {
    const appStateMachineActor = createAppStateMachineActor();

    return {
        start: (): void => {
            appStateMachineActor.start();
        },
        stop: (): void => {
            appStateMachineActor.stop();
        }
    };
};
