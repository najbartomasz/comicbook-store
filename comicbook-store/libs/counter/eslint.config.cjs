const baseConfig = require('../../eslint.config.cjs');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        rules: {},
        languageOptions: {
            parserOptions: {
                project: ['libs/counter/tsconfig.*?.json']
            },
        },
    }
];
