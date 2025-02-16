import { PlaywrightSelector } from '@comicbook-store/testing/e2e/playwright';
import { MainPage } from '@page-object';
import { test as base } from '@playwright/test';

export const test = base.extend<{ mainPage: MainPage }>({
    mainPage: async ({ page }, use) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(async () => document.fonts.ready);
        await use(new MainPage(new PlaywrightSelector(page.locator('html'))));
    }
});
