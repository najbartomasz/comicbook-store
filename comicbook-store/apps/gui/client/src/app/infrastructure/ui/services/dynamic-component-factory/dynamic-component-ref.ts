import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef {
    public readonly close$: Observable<unknown>;
    public readonly destroy$: Observable<void>;

    readonly #close$ = new Subject<unknown>();
    readonly #destroy$ = new Subject<void>();

    constructor() {
        this.close$ = this.#close$.asObservable();
        this.destroy$ = this.#destroy$.asObservable();
    }

    public close(value?: unknown): void {
        this.#close$.next(value);
        this.#close$.complete();
    }

    public destroy(): void {
        this.#destroy$.next();
        this.#destroy$.complete();
    }
}
