import { SingletonFactoryStrategy } from './singleton.factory-strategy';

describe('SingletonFactoryStrategy', () => {
    test('creates only one instance of an object', () => {
        // Given
        const createObject = () => ({ type: 'Stub'})
        const factory = new SingletonFactoryStrategy();

        // When
        const firstInstance = factory.create(createObject);
        const secondInstance = factory.create(createObject);

        // Then
        expect(firstInstance).toStrictEqual({ type: 'Stub' });
        expect(firstInstance).toBe(secondInstance);
    });
});
