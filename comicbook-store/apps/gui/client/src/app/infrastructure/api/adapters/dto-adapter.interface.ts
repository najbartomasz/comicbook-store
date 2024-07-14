export interface DtoAdapter<T, K> {
    fromDto(dto: T): K;
}
