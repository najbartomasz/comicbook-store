import { Observable, Subject } from 'rxjs';

export class DynamicDialogRef {
    public readonly closed$: Observable<void>;

    readonly #closed$ = new Subject<void>();

    public constructor() {
        this.closed$ = this.#closed$.asObservable();
    }

    public close(): void {
        this.#closed$.next();
        this.#closed$.complete();
    }
}
