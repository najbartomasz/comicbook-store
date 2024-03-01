import { createActor, setup } from 'xstate';
import { AppStateTransitionEvent } from './app-state-transition-event';

export const createAppStateMachineActor = () => createActor(
    setup({
        types: {
            events: {} as
                | { type: AppStateTransitionEvent.Unauthenticated }
        }
    }).createMachine({
        // eslint-disable-next-line max-len
        /** @xstate-layout N4IgpgJg5mDOIC5QEEAOqDKAXAhlsAsjgMYAWAlgHZgB0suATlgMQCulOrWpYlW5xPJADaABgC6iUKgD2scvxmUpIAB6IAjADYALABoQAT0QAODTQCsAXxsHKMiHBVpMufETJUwK2fMXKkNUQAWi0DYwRQ2xAXbCEPCmo6RiwfOQVyJRV1BB0AJnDTPOjYt0ISRNoAGxkoKjS-TIDQHIBmHS0aAE4tEwB2C0KEE2KbKyA */
        id: 'AppStateMachine',
        initial: 'start',
        states: {
            start: {
                tags: ['start'],
                on: {
                    unauthenticated: 'login'
                }
            },
            login: {
                tags: ['login']
            }
        }
    })
);
