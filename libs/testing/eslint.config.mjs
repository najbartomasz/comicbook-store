import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
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
            parser: await import('jsonc-eslint-parser'),
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: 'libs/testing/tsconfig.*?.json'
            },
        }
    }
];
