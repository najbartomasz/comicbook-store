import { Counter } from './counter.model';

export class IncrementalCounter implements Counter {
    #value = 0;

    public get nextValue(): number {
        return ++this.#value;
    }
}
