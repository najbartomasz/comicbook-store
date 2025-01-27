import { DataWarehouseEndpoint as DataWarehouse } from './data-warehouse/endpoint';

const addPrefix = (prefix: string, endpoint: Record<string, string>): Record<string, string> => (
    Object.fromEntries(Object.entries(endpoint).map(([key, value]) => [key, `${prefix}${value}`]))
);

export const DataWarehouseEndpointPrefix = '/data-warehouse';
export const DataWarehouseEndpoint = addPrefix(DataWarehouseEndpointPrefix, DataWarehouse) as typeof DataWarehouse;
