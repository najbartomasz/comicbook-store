import { Selector } from './selector.model';
import { Verifier } from './verifier.model';

export interface Element {
    readonly selector: Selector;
    readonly verifier: Verifier;
}
