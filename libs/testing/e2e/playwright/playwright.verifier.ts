import { Verifier } from '@e2e/models';
import { expect } from '@playwright/test';
import { PlaywrightRawHandle } from './playwright.raw-handle';

export class PlaywrightVerifier extends PlaywrightRawHandle implements Verifier {
    public async toHaveScreenshot(name: string): Promise<void> {
        const fileName = name.endsWith('.png') ? name : `${name}.png`;
        await expect(this.rawHandle).toHaveScreenshot(fileName);
    }
}
