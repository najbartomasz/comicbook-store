// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        teardown: {
            destroyAfterEach: false,
            rethrowErrors: true
        },
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true
    }
};
import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
import './test/polyfills/html-dialog-element.polyfill';

import { TextDecoder, TextEncoder } from 'node:util';
Object.assign(global, { TextDecoder, TextEncoder });

import { VirtualConsole } from 'jsdom';
const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
const suppressedJsdomErrors = [
    'Not implemented: HTMLFormElement.prototype.requestSubmit'
];
virtualConsole.on('jsdomError', (err) => {
    if (!suppressedJsdomErrors.includes(err.message)) {
        throw err;
    }
});
declare global {
  interface Window {
    _virtualConsole: VirtualConsole;
  }
}
window._virtualConsole = virtualConsole;

afterEach(() => {
    document.body.innerHTML = '';
});
