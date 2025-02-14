import { Element, Selector } from '@e2e/models';
import { PlaywrightElement } from './playwright.element';
import { PlaywrightRawHandle } from './playwright.raw-handle';

export class PlaywrightSelector extends PlaywrightRawHandle implements Selector {
    public getBySelector(tagName: string): Element {
        return new PlaywrightElement(this.rawHandle.locator(tagName));
    }
}
