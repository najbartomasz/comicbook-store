import { InjectionToken, inject } from '@angular/core';
import { AppStateTransitionEventBusService } from './app-state-transition-event-bus.service';
import { AppStateTransitionEventDispatcher } from './app-state-transition-event-dispatcher.model';

export const AppStateTransitionEventDispatcherToken = new InjectionToken<AppStateTransitionEventDispatcher>(
    'AppStateTransitionDispatcher',
    { providedIn: 'root', factory: () => inject(AppStateTransitionEventBusService) }
);
