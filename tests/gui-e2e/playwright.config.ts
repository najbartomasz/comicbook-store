import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] ?? 'http://localhost:4200';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    ...nxE2EPreset(__filename, { testDir: './specs' }),
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    retries: 0,
    use: {
        baseURL,
        /* Collect trace for failed tests See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        /* Collect video for failed tests See https://playwright.dev/docs/api/class-testoptions#test-options-video */
        video: 'retain-on-failure',
        /* Take screenshots for failed tests See https://playwright.dev/docs/api/class-testoptions#test-options-screenshot */
        screenshot: 'only-on-failure',
        /* Theme */
        colorScheme: 'dark'
    },
    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npx nx run gui:serve',
        url: 'http://localhost:4200',
        reuseExistingServer: !process.env['CI'],
        cwd: workspaceRoot,
    },
    expect: {
        timeout: 2 * 1000
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 }
            },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },

        // Uncomment for mobile browsers support
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        // Uncomment for branded browsers
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // }
    ],
});
