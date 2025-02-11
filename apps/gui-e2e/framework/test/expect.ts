import { VerifiablePageObject } from '@comicbook-store/testing/e2e/page-object';

export const expect = <T extends VerifiablePageObject<T['verifier']>>(pageObject: T): T['verifier'] => pageObject.verifier;
