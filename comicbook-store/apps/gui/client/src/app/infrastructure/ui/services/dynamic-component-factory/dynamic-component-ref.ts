import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef {
    public readonly close$: Observable<void>;

    readonly #close$ = new Subject<void>();

    public constructor() {
        this.close$ = this.#close$.asObservable();
    }

    public close(): void {
        this.#close$.complete();
    }
}
