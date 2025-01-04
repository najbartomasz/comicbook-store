import { Counter } from '@core/models';

export class IncrementalCounter implements Counter {
    #value = 0;

    get nextValue(): number {
        return ++this.#value;
    }
}
