const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    coverageReporters: ['text', 'lcov', 'html'],
    fakeTimers: {
        enableGlobally: true
    },
    resetMocks: true,
    restoreMocks: true,
    randomize: true
};
