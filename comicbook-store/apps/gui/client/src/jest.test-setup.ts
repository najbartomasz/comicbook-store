// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};
import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

process.env.TZ = 'UTC';