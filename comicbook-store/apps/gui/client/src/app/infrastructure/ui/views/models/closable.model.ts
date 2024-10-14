import { OutputEmitterRef } from '@angular/core';

export interface Closable<T> {
    close: OutputEmitterRef<T>;
}
