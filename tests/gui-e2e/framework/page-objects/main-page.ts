import { Element } from '@comicbook-store/testing/e2e/models';
import { PageObjectVerifier, VerifiablePageObject } from '@comicbook-store/testing/e2e/page-object';

export class MainPage extends VerifiablePageObject<PageObjectVerifier> {
    public readonly verifier = new PageObjectVerifier(this.element.verifier);

    protected createElement(): Element {
        return this.parentSelector.getBySelector('body');
    }
}
