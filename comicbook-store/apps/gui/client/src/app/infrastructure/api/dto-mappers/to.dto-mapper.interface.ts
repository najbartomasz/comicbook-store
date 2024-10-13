export interface ToDtoMapper<T, K> {
    toDto(data: T): K;
}
