export interface FactoryStrategy<T> {
    create(createObject: () => T): T;
}
