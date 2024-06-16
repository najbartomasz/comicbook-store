const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    coverageReporters: ['text', 'lcov', 'html'],
    collectCoverageFrom: ['src/**'],
    fakeTimers: {
        enableGlobally: true
    },
    resetMocks: true,
    restoreMocks: true,
    randomize: true,
    globalSetup: './jest.global-setup.ts'
};
