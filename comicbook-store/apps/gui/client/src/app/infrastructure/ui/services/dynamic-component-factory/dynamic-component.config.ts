export interface DynamicComponentConfig<T extends Record<string, unknown> = Record<string, unknown>> {
    hostElement?: HTMLElement;
    componentInputs?: T;
}
