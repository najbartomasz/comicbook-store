import playwright from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.mjs';

export default [
    playwright.configs['flat/recommended'],
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.js'],
        // Override or add rules here
        rules: {},
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: 'tests/gui-e2e/tsconfig.json'
            },
        }
    }
];
