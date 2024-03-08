import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppStateTransitionEvent } from '../app-state-transition-event';

@Injectable({
    providedIn: 'root'
})
export class AppStateTransitionEventBusService {
    public get transitionEvent$(): Observable<AppStateTransitionEvent> {
        return this.#transitionEvent$;
    }

    readonly #transitionEvent$ = new Subject<AppStateTransitionEvent>();

    public dispatch(event: AppStateTransitionEvent): void {
        this.#transitionEvent$.next(event);
    }
}
