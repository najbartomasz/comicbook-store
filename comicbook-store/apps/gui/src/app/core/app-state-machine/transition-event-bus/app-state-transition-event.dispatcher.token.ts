import { InjectionToken } from '@angular/core';
import { createAppStateTransitionEventBus } from './app-state-transition-event-bus';
import { AppStateTransitionEventDispatcher } from './app-state-transition-event-dispatcher.model';

export const AppStateTransitionDispatcher = new InjectionToken<AppStateTransitionEventDispatcher>(
    'AppStateTransitionDispatcher',
    { providedIn: 'root', factory: createAppStateTransitionEventBus }
);
