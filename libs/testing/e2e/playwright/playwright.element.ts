import { Locator } from '@playwright/test';
import { Element, Selector, Verifier } from '../models';
import { PlaywrightSelector } from './playwright.selector';
import { PlaywrightVerifier } from './playwright.verifier';

export class PlaywrightElement implements Element {
    public readonly selector: Selector;
    public readonly verifier: Verifier;

    public constructor(rawHandle: Locator) {
        this.selector = new PlaywrightSelector(rawHandle);
        this.verifier = new PlaywrightVerifier(rawHandle);
    }
}
