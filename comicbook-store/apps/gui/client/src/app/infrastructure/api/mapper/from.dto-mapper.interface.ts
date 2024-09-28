export interface FromDtoMapper<T, K> {
    fromDto(dto: T): K;
}
