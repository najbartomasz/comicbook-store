export default {
    displayName: 'gui-client',
    preset: '../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/jest.test-setup.ts'],
    coverageDirectory: '../../../coverage/apps/gui/client',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$'
            }
        ]
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ],
    globalSetup: '../../../jest.global-setup.ts'
};
