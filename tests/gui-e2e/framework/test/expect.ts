import { PageObjectVerifier, VerifiablePageObject } from '@comicbook-store/testing/e2e/page-object';

export const expect = <T extends VerifiablePageObject<PageObjectVerifier>>(pageObject: T): T['verifier'] => pageObject.verifier;
