import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly close$: Observable<any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly #close$ = new Subject<any>();

    public constructor() {
        this.close$ = this.#close$.asObservable();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public close(data?: any): void {
        this.#close$.next(data);
        this.#close$.complete();
    }
}
