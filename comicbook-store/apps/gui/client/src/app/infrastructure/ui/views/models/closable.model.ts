import { OutputEmitterRef } from '@angular/core';

export interface Closable {
    close: OutputEmitterRef<void>;
}
