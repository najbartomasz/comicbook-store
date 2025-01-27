const baseConfig = require('../../eslint.config.cjs');

const baseConfigTsRules = baseConfig
    .filter((config) => config.files?.includes('**/*.ts'))
    .find((config) => config.languageOptions?.parserOptions?.project?.includes('tsconfig.*?.json'))
    .rules ?? {};

const baseConfigSpecTsRules = baseConfig
    .find((config) => config.files?.includes('**/*.spec.ts'))
    .rules ?? {};


module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        rules: {
            ...baseConfigTsRules
        },
        languageOptions: {
            parserOptions: {
                project: ['libs/factory-strategy/tsconfig.*?.json']
            },
        },
    },
    {
        files: ['**/*.spec.ts', 'testing/**/*.ts'],
        rules: {
            ...baseConfigSpecTsRules
        },
    }
];
