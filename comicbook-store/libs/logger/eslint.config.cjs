const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../eslint.config.cjs');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        rules: {},
        languageOptions: {
            parserOptions: {
                project: ['libs/logger/tsconfig.*?.json']
            },
        },
    }
];
