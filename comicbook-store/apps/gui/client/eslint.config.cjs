const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../../eslint.config.cjs');

const baseConfigTsRules = baseConfig
    .filter((config) => config.files?.includes('**/*.ts'))
    .find((config) => config.languageOptions?.parserOptions?.project?.includes('tsconfig.*?.json'))
    .rules ?? {};

const baseConfigSpecTsRules = baseConfig
    .find((config) => config.files?.includes('**/*.spec.ts'))
    .rules ?? {};


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
                ...baseConfigTsRules,
                '@angular-eslint/prefer-standalone': 'off',
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
        files: ['src/app/infrastructure/**/*.ts'],
        rules: {
            ...baseConfigTsRules,
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['../*', 'app/*'],
                            message:
                                'Relative imports are forbidden. Use absolute paths instead.',
                        },
                        {
                            group: ['@testing*'],
                            message:
                                'Infrastructure files cannot be depended on testing code.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/feature/**/*.ts'],
        rules: {
            ...baseConfigTsRules,
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@di*', '@ui*', '@api*'],
                            message:
                                'Feature files cannot be depended on any other layer.',
                        },
                        {
                            group: ['../*', 'app/*'],
                            message:
                                'Relative imports are forbidden. Use absolute paths instead.',
                        },
                        {
                            group: ['@testing*'],
                            message:
                                'Feature files cannot be depended on testing code.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/core/**/*.ts'],
        rules: {
            ...baseConfigTsRules,
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@di*', '@ui*', '@api*', '@feature*'],
                            message:
                                'Core files cannot be depended on any other layer.',
                        },
                        {
                            group: ['../*', 'app/*'],
                            message:
                                'Relative imports are forbidden. Use absolute paths instead.',
                        },
                        {
                            group: ['@testing*'],
                            message:
                                'Core files cannot be depended on testing code.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/app/lib/**/*.ts'],
        rules: {
            ...baseConfigTsRules,
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '@di*',
                                '@ui*',
                                '@api*',
                                '@feature*',
                                '@core*',
                            ],
                            message:
                                'Lib files cannot be depended on application code.',
                        },
                        {
                            group: ['../*', 'app/*'],
                            message:
                                'Relative imports are forbidden. Use absolute paths instead.',
                        },
                        {
                            group: ['@testing*'],
                            message:
                                'Lib files cannot be depended on testing code.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.spec.ts', 'testing/**/*.ts'],
        rules: {
            ...baseConfigSpecTsRules
        },
    }
];
