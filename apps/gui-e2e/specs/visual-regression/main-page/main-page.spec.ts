import { expect, test } from '@test';

test('displays home page by default', async ({ mainPage }) => {
    await expect(mainPage).toHaveScreenshot('default-view');
});
