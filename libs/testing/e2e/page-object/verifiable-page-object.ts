import { PageObject } from './page-object';
import { PageObjectVerifier } from './page-object-verifier';

export abstract class VerifiablePageObject<T extends PageObjectVerifier> extends PageObject {
    public abstract readonly verifier: T;
}
