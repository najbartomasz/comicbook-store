import { OutputEmitterRef } from '@angular/core';

export interface Closable<T> {
    readonly close: OutputEmitterRef<T>;
}
