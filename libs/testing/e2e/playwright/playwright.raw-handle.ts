import { Locator } from '@playwright/test';

export class PlaywrightRawHandle {
    public constructor(protected readonly rawHandle: Locator) { }
}
