import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef {
    public readonly close$: Observable<unknown>;

    readonly #close$ = new Subject<unknown>();

    constructor() {
        this.close$ = this.#close$.asObservable();
    }

    public close(value?: unknown): void {
        this.#close$.next(value);
        this.#close$.complete();
    }
}
