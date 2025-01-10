const baseConfig = require('../../eslint.config.cjs');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: ['apps/data-warehouse/tsconfig.*?.json']
            }
        },
    },
    {
        files: ['src/infrastructure/**/*.ts'],
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
        files: ['src/domain/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@infrastructure*'],
                            message:
                                'Domain files cannot be depended on any other layer.',
                        },
                        {
                            group: ['../*'],
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
        files: ['src/core/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@infrastructure*', '@domain*'],
                            message:
                                'Core files cannot be depended on any other layer.',
                        },
                        {
                            group: ['../*'],
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
        files: ['src/lib/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '@infrastructure*',
                                '@domain*',
                                '@core*'
                            ],
                            message:
                                'Lib files cannot be depended on application code.',
                        },
                        {
                            group: ['../*'],
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
        rules: { 'no-restricted-imports': 'off' },
    }
];
