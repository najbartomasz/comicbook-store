import { DataWarehouseEndpoint } from './endpoint';

describe('DataWarehouseEndpoint', () => {
    test('adds prefix to all data-warehouse endpoints', () => {
        expect(DataWarehouseEndpoint).toStrictEqual({
            Brandings: '/data-warehouse/brandings',
        });
    });
});
