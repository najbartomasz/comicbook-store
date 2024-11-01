const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../../eslint.config.cjs');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    ...baseConfig,
    ...compat
        .config({
            extends: [
                'plugin:@nx/angular',
                'plugin:@angular-eslint/template/process-inline-templates',
            ],
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts'],
            rules: {
                ...config.rules,
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'cbs',
                        style: 'camelCase',
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'cbs',
                        style: 'kebab-case',
                    },
                ],
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['@test/*'],
                                message:
                                    'Test files cannot be imported in production code.',
                            },
                        ],
                    },
                ],
            },
            languageOptions: {
                parserOptions: {
                    project: ['apps/gui/client/tsconfig.*?.json'],
                    createDefaultProgram: true,
                },
            },
        })),
    ...compat
        .config({ extends: ['plugin:@nx/angular-template'] })
        .map((config) => ({
            ...config,
            files: ['**/*.html'],
            rules: {
                ...config.rules,
            },
        })),
    {
        files: ['**/*.spec.ts', 'test/**/*.ts'],
        rules: { 'no-restricted-imports': 'off' },
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../*'],
                            message:
                                'Relative imports are forbidden. Use absolute paths instead.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/feature/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '../**/infrastructure/*',
                                '@ui/*',
                                '@api/*',
                            ],
                            message:
                                'Feature files cannot be depended on any other layer.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/core/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '../**/infrastructure/*',
                                '@ui/*',
                                '@api/*',
                                '../**/feature/*',
                                '@feature/*',
                            ],
                            message:
                                'Core files cannot be depended on any other layer.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/lib/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '../**/infrastructure/*',
                                '@ui/*',
                                '@api/*',
                                '../**/feature/*',
                                '@feature/*',
                                '../**/core/*',
                                '@core/*',
                            ],
                            message:
                                'Lib files cannot be depended on application code.',
                        },
                    ],
                },
            ],
        },
    },
];
