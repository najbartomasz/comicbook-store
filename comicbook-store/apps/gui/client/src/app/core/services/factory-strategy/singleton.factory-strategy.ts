import { FactoryStrategy } from '@core/models';

export class SingletonFactoryStrategy<T> implements FactoryStrategy<T> {
    #instance: T | undefined;

    public create(createObject: () => T): T {
        if (this.#instance === undefined) {
            this.#instance = createObject();
        }
        return this.#instance;
    }
}
