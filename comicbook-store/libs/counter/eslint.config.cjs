const baseConfig = require('../../eslint.config.cjs');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {},
        languageOptions: {
            parserOptions: {
                project: ['libs/counter/tsconfig.*?.json']
            },
        },
    },
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
                },
            ],
        },
        languageOptions: {
            parser: require('jsonc-eslint-parser'),
        },
    },
];
