import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
    teardown: {
        destroyAfterEach: true,
        rethrowErrors: true
    },
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
});
