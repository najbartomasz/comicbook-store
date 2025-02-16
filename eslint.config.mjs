import nx from '@nx/eslint-plugin';
import stylisticEslintPluginJs from '@stylistic/eslint-plugin-js';
import stylisticEslintPluginTs from '@stylistic/eslint-plugin-ts';
import jestEslintPlugin from 'eslint-plugin-jest';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: ['**/dist']
    },
    {
        plugins: {
            '@stylistic/js': stylisticEslintPluginJs,
            '@stylistic/ts': stylisticEslintPluginTs,
            jest: jestEslintPlugin
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*']
                        }
                    ]
                }
            ],
            'array-bracket-newline': ['error', 'consistent'],
            'array-bracket-spacing': ['error', 'never'],
            'array-element-newline': ['error', 'consistent'],
            'array-callback-return': ['error', { checkForEach: true }],
            'accessor-pairs': 'off',
            'arrow-body-style': ['error', 'as-needed'],
            'block-scoped-var': 'error',
            camelcase: ['error'],
            'capitalized-comments': 'off',
            'class-methods-use-this': 'off',
            complexity: 'error',
            'comma-dangle': ['error', 'never'],
            'consistent-return': 'error',
            'consistent-this': 'error',
            curly: ['error', 'all'],
            'default-case': 'error',
            'default-case-last': 'error',
            eqeqeq: ['error', 'always'],
            'func-name-matching': [
                'error',
                'always',
                {
                    considerPropertyDescriptor: true,
                    includeCommonJSModuleExports: true,
                },
            ],
            'func-names': ['error', 'always', { generators: 'always' }],
            'func-style': [
                'error',
                'declaration',
                { allowArrowFunctions: true },
            ],
            'function-call-argument-newline': ['error', 'consistent'],
            'grouped-accessor-pairs': 'off',
            'guard-for-in': 'error',
            'id-denylist': 'off',
            'id-length': 'off',
            'id-match': 'error',
            'implicit-arrow-linebreak': 'error',
            'init-declarations': 'off',
            'line-comment-position': 'off',
            'lines-around-comment': 'off',
            'max-depth': 'error',
            'max-lines': [
                'error',
                {
                    max: 299,
                    skipBlankLines: false,
                    skipComments: false,
                },
            ],
            'max-lines-per-function': [
                'error',
                {
                    IIFEs: true,
                    max: 50,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            'max-nested-callbacks': ['error', 3],
            'max-statements': 'off',
            'new-cap': [
                'error',
                {
                    capIsNew: false,
                    capIsNewExceptions: [],
                    capIsNewExceptionPattern: '',
                    newIsCap: true,
                    newIsCapExceptions: [],
                    newIsCapExceptionPattern: '',
                    properties: true,
                },
            ],
            'no-alert': 'error',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-confusing-arrow': 'error',
            'no-console': 'error',
            'no-div-regex': 'error',
            'no-else-return': ['error', { allowElseIf: false }],
            'no-eq-null': 'error',
            'no-eval': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-extra-label': 'error',
            'no-floating-decimal': 'error',
            'no-implicit-globals': 'error',
            'no-implied-eval': 'error',
            'no-implicit-coercion': 'off',
            'no-inline-comments': 'off',
            'no-invalid-this': 'error',
            'no-iterator': 'error',
            'no-label-var': 'error',
            'no-labels': 'error',
            'no-lone-blocks': 'error',
            'no-lonely-if': 'error',
            'no-loop-func': 'error',
            'no-mixed-operators': 'error',
            'no-multi-assign': 'error',
            'no-multi-str': 'error',
            'no-negated-condition': 'error',
            'no-nested-ternary': 'error',
            'no-new': 'error',
            'no-new-func': 'error',
            'no-new-object': 'error',
            'no-new-wrappers': 'error',
            'no-octal-escape': 'error',
            'no-param-reassign': 'off',
            'no-proto': 'error',
            'no-restricted-exports': 'error',
            'no-restricted-globals': 'error',
            'no-restricted-properties': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        ":matches(PropertyDefinition, MethodDefinition)[accessibility='private']",
                    message: 'Use #varName instead',
                },
            ],
            'no-return-assign': 'error',
            'no-return-await': 'error',
            'no-script-url': 'error',
            'no-sequences': 'error',
            'no-underscore-dangle': 'off',
            'no-unneeded-ternary': 'error',
            'no-useless-call': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-concat': 'error',
            'no-useless-rename': [
                'error',
                {
                    ignoreDestructuring: false,
                    ignoreExport: false,
                    ignoreImport: false,
                },
            ],
            'no-useless-return': 'error',
            'no-var': 'error',
            'no-void': 'error',
            'no-warning-comments': [
                'warn',
                {
                    terms: ['todo', 'fixme'],
                    location: 'anywhere',
                },
            ],
            'no-with': 'error',
            'no-await-in-loop': 'error',
            'no-plusplus': 'off',
            'no-duplicate-imports': ['error', { includeExports: false }],
            'no-promise-executor-return': 'error',
            'no-restricted-imports': 'error',
            'no-self-compare': 'error',
            'no-shadow': 'off',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'error',
            'no-useless-constructor': 'off',
            'no-use-before-define': [
                'error',
                {
                    functions: false,
                    classes: true,
                    variables: true,
                },
            ],
            'object-curly-newline': 'error',
            'object-property-newline': [
                'error',
                { allowAllPropertiesOnSameLine: true },
            ],
            'object-shorthand': ['error', 'always'],
            'one-var': ['error', 'never'],
            'one-var-declaration-per-line': ['error', 'always'],
            'operator-assignment': ['error', 'always'],
            'padding-line-between-statements': 'error',
            'prefer-arrow-callback': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowUnboundThis: false,
                },
            ],
            'prefer-const': 'error',
            'prefer-exponentiation-operator': 'error',
            'prefer-named-capture-group': 'off',
            'prefer-numeric-literals': 'error',
            'prefer-object-spread': 'error',
            'prefer-promise-reject-errors': [
                'error',
                { allowEmptyReject: true },
            ],
            'prefer-regex-literals': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'quote-props': ['error', 'consistent-as-needed'],
            radix: ['error', 'always'],
            'require-atomic-updates': 'error',
            'require-unicode-regexp': 'error',
            'sort-imports': 'off',
            'spaced-comment': 'off',
            strict: ['error', 'never'],
            'symbol-description': 'error',
            'vars-on-top': 'error',
            yoda: ['error', 'never'],
            'arrow-parens': ['error', 'always'],
            'arrow-spacing': [
                'error',
                {
                    before: true,
                    after: true,
                },
            ],
            'block-spacing': 'error',
            'comma-spacing': [
                'error',
                {
                    after: true,
                    before: false,
                },
            ],
            'comma-style': [
                'error',
                'last',
                {
                    exceptions: {
                        ArrayExpression: false,
                        ArrayPattern: false,
                        ArrowFunctionExpression: false,
                        CallExpression: false,
                        FunctionDeclaration: false,
                        FunctionExpression: false,
                        ImportDeclaration: false,
                        ObjectExpression: false,
                        ObjectPattern: false,
                        VariableDeclaration: false,
                        NewExpression: false,
                    },
                },
            ],
            'computed-property-spacing': ['error', 'never'],
            'dot-location': ['error', 'property'],
            'eol-last': ['error', 'always'],
            'func-call-spacing': ['error', 'never'],
            'function-paren-newline': ['error', 'consistent'],
            'generator-star-spacing': [
                'error',
                {
                    before: true,
                    after: false,
                },
            ],
            indent: ['error', 4, { SwitchCase: 1 }],
            'jsx-quotes': ['error', 'prefer-double'],
            'key-spacing': [
                'error',
                {
                    afterColon: true,
                    beforeColon: false,
                    mode: 'strict',
                },
            ],
            'keyword-spacing': [
                'error',
                {
                    after: true,
                    before: true,
                    overrides: {},
                },
            ],
            'max-len': [
                'error',
                {
                    code: 140,
                    comments: 140,
                    ignoreComments: false,
                    ignorePattern: '',
                    ignoreRegExpLiterals: false,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: false,
                    ignoreTrailingComments: false,
                    ignoreUrls: false,
                    tabWidth: 4,
                },
            ],
            'max-statements-per-line': ['error', { max: 2 }],
            'multiline-ternary': ['error', 'always-multiline'],
            'new-parens': ['error', 'always'],
            'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-tabs': 'error',
            'no-trailing-spaces': 'error',
            'no-whitespace-before-property': 'error',
            'object-curly-spacing': [
                'error',
                'always',
                {
                    arraysInObjects: true,
                    objectsInObjects: true,
                },
            ],
            'operator-linebreak': ['error', 'before'],
            'padded-blocks': ['error', 'never'],
            quotes: [
                'error',
                'single',
                {
                    allowTemplateLiterals: true,
                    avoidEscape: true,
                },
            ],
            'rest-spread-spacing': ['error', 'never'],
            semi: ['error', 'always', { omitLastInOneLineBlock: false }],
            'semi-spacing': [
                'error',
                {
                    after: true,
                    before: false,
                },
            ],
            'semi-style': ['error', 'last'],
            'space-before-blocks': ['error', 'always'],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'always',
                    asyncArrow: 'always',
                    named: 'never',
                },
            ],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'space-unary-ops': [
                'error',
                {
                    nonwords: false,
                    overrides: { '!': false },
                    words: true,
                },
            ],
            'switch-colon-spacing': [
                'error',
                {
                    after: true,
                    before: false,
                },
            ],
            'template-tag-spacing': ['error', 'never'],
            'template-curly-spacing': ['error', 'never'],
            'unicode-bom': ['error', 'never'],
            'wrap-iife': ['error', 'inside'],
            'wrap-regex': 'error',
            'yield-star-spacing': ['error', 'before']
        }
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.js',
            '**/*.jsx',
            '**/*.cjs',
            '**/*.mjs'
        ],
        // Override or add rules here
        rules: {
            // 'array-bracket-newline': ['error', 'consistent'],
            // 'array-bracket-spacing': ['error', 'never'],
            // 'array-element-newline': ['error', 'consistent'],
            // 'array-callback-return': ['error', { checkForEach: true }],
            // 'accessor-pairs': 'off',
            // 'arrow-body-style': ['error', 'as-needed'],
            // 'block-scoped-var': 'error',
            // 'camelcase': ['error'],
            // 'capitalized-comments': 'off',
            // 'class-methods-use-this': 'off',
            // 'complexity': 'error',
            // 'comma-dangle': ['error', 'never'],
            // 'consistent-return': 'error',
            // 'consistent-this': 'error',
            // 'curly': ['error', 'all'],
            // 'default-case': 'error',
            // 'default-case-last': 'error',
            // 'eqeqeq': ['error', 'always'],
            // 'func-name-matching': [
            //     'error',
            //     'always',
            //     {
            //         considerPropertyDescriptor: true,
            //         includeCommonJSModuleExports: true
            //     }
            // ],
            // 'func-names': ['error', 'always', { generators: 'always' }],
            // 'func-style': [
            //     'error',
            //     'declaration',
            //     { allowArrowFunctions: true }
            // ],
            // 'function-call-argument-newline': ['error', 'consistent'],
            // 'grouped-accessor-pairs': 'off',
            // 'guard-for-in': 'error',
            // 'id-denylist': 'off',
            // 'id-length': 'off',
            // 'id-match': 'error',
            // 'implicit-arrow-linebreak': 'error',
            // 'init-declarations': 'off',
            // 'line-comment-position': 'off',
            // 'lines-around-comment': 'off',
            // 'max-depth': 'error',
            // 'max-lines': [
            //     'error',
            //     {
            //         max: 299,
            //         skipBlankLines: false,
            //         skipComments: false
            //     }
            // ],
            // 'max-lines-per-function': [
            //     'error',
            //     {
            //         IIFEs: true,
            //         max: 50,
            //         skipBlankLines: true,
            //         skipComments: true
            //     }
            // ],
            // 'max-nested-callbacks': ['error', 3],
            // 'max-statements': 'off',
            // 'new-cap': [
            //     'error',
            //     {
            //         capIsNew: false,
            //         capIsNewExceptions: [],
            //         capIsNewExceptionPattern: '',
            //         newIsCap: true,
            //         newIsCapExceptions: [],
            //         newIsCapExceptionPattern: '',
            //         properties: true
            //     }
            // ],
            // 'no-alert': 'error',
            // 'no-bitwise': 'error',
            // 'no-caller': 'error',
            // 'no-confusing-arrow': 'error',
            // 'no-console': 'error',
            // 'no-div-regex': 'error',
            // 'no-else-return': ['error', { allowElseIf: false }],
            // 'no-eq-null': 'error',
            // 'no-eval': 'error',
            // 'no-extend-native': 'error',
            // 'no-extra-bind': 'error',
            // 'no-extra-label': 'error',
            // 'no-floating-decimal': 'error',
            // 'no-implicit-globals': 'error',
            // 'no-implied-eval': 'error',
            // 'no-implicit-coercion': 'off',
            // 'no-inline-comments': 'off',
            // 'no-invalid-this': 'error',
            // 'no-iterator': 'error',
            // 'no-label-var': 'error',
            // 'no-labels': 'error',
            // 'no-lone-blocks': 'error',
            // 'no-lonely-if': 'error',
            // 'no-loop-func': 'error',
            // 'no-mixed-operators': 'error',
            // 'no-multi-assign': 'error',
            // 'no-multi-str': 'error',
            // 'no-negated-condition': 'error',
            // 'no-nested-ternary': 'error',
            // 'no-new': 'error',
            // 'no-new-func': 'error',
            // 'no-new-object': 'error',
            // 'no-new-wrappers': 'error',
            // 'no-octal-escape': 'error',
            // 'no-param-reassign': 'off',
            // 'no-proto': 'error',
            // 'no-restricted-exports': 'error',
            // 'no-restricted-globals': 'error',
            // 'no-restricted-properties': 'error',
            // 'no-restricted-syntax': [
            //     'error',
            //     {
            //         selector:
            //             ":matches(PropertyDefinition, MethodDefinition)[accessibility='private']",
            //         message: 'Use #varName instead'
            //     }
            // ],
            // 'no-return-assign': 'error',
            // 'no-return-await': 'error',
            // 'no-script-url': 'error',
            // 'no-sequences': 'error',
            // 'no-underscore-dangle': 'off',
            // 'no-unneeded-ternary': 'error',
            // 'no-useless-call': 'error',
            // 'no-useless-computed-key': 'error',
            // 'no-useless-concat': 'error',
            // 'no-useless-rename': [
            //     'error',
            //     {
            //         ignoreDestructuring: false,
            //         ignoreExport: false,
            //         ignoreImport: false
            //     }
            // ],
            // 'no-useless-return': 'error',
            // 'no-var': 'error',
            // 'no-void': 'error',
            // 'no-warning-comments': [
            //     'warn',
            //     {
            //         terms: ['todo', 'fixme'],
            //         location: 'anywhere'
            //     }
            // ],
            // 'no-with': 'error',
            // 'no-await-in-loop': 'error',
            // 'no-plusplus': 'off',
            // 'no-duplicate-imports': ['error', { includeExports: false }],
            // 'no-promise-executor-return': 'error',
            // 'no-restricted-imports': 'error',
            // 'no-self-compare': 'error',
            // 'no-shadow': 'off',
            // 'no-unmodified-loop-condition': 'error',
            // 'no-unreachable-loop': 'error',
            // 'no-useless-constructor': 'off',
            // 'no-use-before-define': [
            //     'error',
            //     {
            //         functions: false,
            //         classes: true,
            //         variables: true
            //     }
            // ],
            // 'object-curly-newline': 'error',
            // 'object-property-newline': [
            //     'error',
            //     { allowAllPropertiesOnSameLine: true }
            // ],
            // 'object-shorthand': ['error', 'always'],
            // 'one-var': ['error', 'never'],
            // 'one-var-declaration-per-line': ['error', 'always'],
            // 'operator-assignment': ['error', 'always'],
            // 'padding-line-between-statements': 'error',
            // 'prefer-arrow-callback': [
            //     'error',
            //     {
            //         allowNamedFunctions: false,
            //         allowUnboundThis: false
            //     }
            // ],
            // 'prefer-const': 'error',
            // 'prefer-exponentiation-operator': 'error',
            // 'prefer-named-capture-group': 'off',
            // 'prefer-numeric-literals': 'error',
            // 'prefer-object-spread': 'error',
            // 'prefer-promise-reject-errors': [
            //     'error',
            //     { allowEmptyReject: true }
            // ],
            // 'prefer-regex-literals': 'error',
            // 'prefer-rest-params': 'error',
            // 'prefer-spread': 'error',
            // 'prefer-template': 'error',
            // 'quote-props': ['error', 'consistent-as-needed'],
            // 'radix': ['error', 'always'],
            // 'require-atomic-updates': 'error',
            // 'require-unicode-regexp': 'error',
            // 'sort-imports': 'off',
            // 'spaced-comment': 'off',
            // 'strict': ['error', 'never'],
            // 'symbol-description': 'error',
            // 'vars-on-top': 'error',
            // 'yoda': ['error', 'never'],
            // 'arrow-parens': ['error', 'always'],
            // 'arrow-spacing': [
            //     'error',
            //     {
            //         before: true,
            //         after: true
            //     }
            // ],
            // 'block-spacing': 'error',
            // 'comma-spacing': [
            //     'error',
            //     {
            //         after: true,
            //         before: false
            //     }
            // ],
            // 'comma-style': [
            //     'error',
            //     'last',
            //     {
            //         exceptions: {
            //             ArrayExpression: false,
            //             ArrayPattern: false,
            //             ArrowFunctionExpression: false,
            //             CallExpression: false,
            //             FunctionDeclaration: false,
            //             FunctionExpression: false,
            //             ImportDeclaration: false,
            //             ObjectExpression: false,
            //             ObjectPattern: false,
            //             VariableDeclaration: false,
            //             NewExpression: false
            //         }
            //     }
            // ],
            // 'computed-property-spacing': ['error', 'never'],
            // 'dot-location': ['error', 'property'],
            // 'eol-last': ['error', 'always'],
            // 'func-call-spacing': ['error', 'never'],
            // 'function-paren-newline': ['error', 'consistent'],
            // 'generator-star-spacing': [
            //     'error',
            //     {
            //         before: true,
            //         after: false
            //     }
            // ],
            // 'indent': ['error', 4, { SwitchCase: 1 }],
            // 'jsx-quotes': ['error', 'prefer-double'],
            // 'key-spacing': [
            //     'error',
            //     {
            //         afterColon: true,
            //         beforeColon: false,
            //         mode: 'strict'
            //     }
            // ],
            // 'keyword-spacing': [
            //     'error',
            //     {
            //         after: true,
            //         before: true,
            //         overrides: {}
            //     }
            // ],
            // 'max-len': [
            //     'error',
            //     {
            //         code: 140,
            //         comments: 140,
            //         ignoreComments: false,
            //         ignorePattern: '',
            //         ignoreRegExpLiterals: false,
            //         ignoreStrings: false,
            //         ignoreTemplateLiterals: false,
            //         ignoreTrailingComments: false,
            //         ignoreUrls: false,
            //         tabWidth: 4
            //     }
            // ],
            // 'max-statements-per-line': ['error', { max: 2 }],
            // 'multiline-ternary': ['error', 'always-multiline'],
            // 'new-parens': ['error', 'always'],
            // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
            // 'no-multi-spaces': 'error',
            // 'no-multiple-empty-lines': ['error', { max: 1 }],
            // 'no-tabs': 'error',
            // 'no-trailing-spaces': 'error',
            // 'no-whitespace-before-property': 'error',
            // 'object-curly-spacing': [
            //     'error',
            //     'always',
            //     {
            //         arraysInObjects: true,
            //         objectsInObjects: true
            //     }
            // ],
            // 'operator-linebreak': ['error', 'before'],
            // 'padded-blocks': ['error', 'never'],
            // 'quotes': [
            //     'error',
            //     'single',
            //     {
            //         allowTemplateLiterals: true,
            //         avoidEscape: true
            //     }
            // ],
            // 'rest-spread-spacing': ['error', 'never'],
            // 'semi': ['error', 'always', { omitLastInOneLineBlock: false }],
            // 'semi-spacing': [
            //     'error',
            //     {
            //         after: true,
            //         before: false
            //     }
            // ],
            // 'semi-style': ['error', 'last'],
            // 'space-before-blocks': ['error', 'always'],
            // 'space-before-function-paren': [
            //     'error',
            //     {
            //         anonymous: 'always',
            //         asyncArrow: 'always',
            //         named: 'never'
            //     }
            // ],
            // 'space-in-parens': ['error', 'never'],
            // 'space-infix-ops': 'error',
            // 'space-unary-ops': [
            //     'error',
            //     {
            //         nonwords: false,
            //         overrides: { '!': false },
            //         words: true
            //     }
            // ],
            // 'switch-colon-spacing': [
            //     'error',
            //     {
            //         after: true,
            //         before: false
            //     }
            // ],
            // 'template-tag-spacing': ['error', 'never'],
            // 'template-curly-spacing': ['error', 'never'],
            // 'unicode-bom': ['error', 'never'],
            // 'wrap-iife': ['error', 'inside'],
            // 'wrap-regex': 'error',
            // 'yield-star-spacing': ['error', 'before'],
        }
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/array-type': [
                'error',
                {
                    default: 'array',
                    readonly: 'array',
                },
            ],
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/ban-tslint-comment': 'error',
            '@typescript-eslint/class-literal-property-style': [
                'error',
                'fields'
            ],
            '@typescript-eslint/consistent-indexed-object-style': [
                'error',
                'record',
            ],
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                    assertionStyle: 'as',
                    objectLiteralTypeAssertions: 'allow',
                },
            ],
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface',
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: {},
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@stylistic/ts/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'semi',
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: false,
                    },
                    multilineDetection: 'brackets',
                },
            ],
            '@stylistic/ts/type-annotation-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                    overrides: {
                        arrow: {
                            before: true,
                            after: true,
                        },
                    },
                },
            ],
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: [
                        'signature',
                        'public-static-field',
                        'public-decorated-field',
                        'public-instance-field',
                        'public-abstract-field',
                        'public-field',
                        'protected-static-field',
                        'protected-decorated-field',
                        'protected-instance-field',
                        'protected-abstract-field',
                        'protected-field',
                        'private-static-field',
                        'private-decorated-field',
                        'private-instance-field',
                        'private-field',
                        'static-field',
                        'instance-field',
                        'abstract-field',
                        'decorated-field',
                        'field',
                        'public-constructor',
                        'protected-constructor',
                        'private-constructor',
                        'constructor',
                        'public-static-method',
                        'public-decorated-method',
                        'public-instance-method',
                        'public-abstract-method',
                        'public-method',
                        'protected-static-method',
                        'protected-decorated-method',
                        'protected-instance-method',
                        'protected-abstract-method',
                        'protected-method',
                        'private-static-method',
                        'private-decorated-method',
                        'private-instance-method',
                        'private-method',
                        'static-method',
                        'instance-method',
                        'abstract-method',
                        'decorated-method',
                        'method',
                    ],
                },
            ],
            '@typescript-eslint/method-signature-style': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: ['typeLike', 'enumMember'],
                    format: ['PascalCase'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid',
                },
                {
                    selector: ['variable'],
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid',
                },
                {
                    selector: ['parameter'],
                    format: ['camelCase'],
                    modifiers: ['unused'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                    custom: {
                        regex: '^[a-zA-Z0-9$]',
                        match: false,
                    },
                },
                {
                    selector: ['variable'],
                    modifiers: ['const'],
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid',
                },
            ],
            '@typescript-eslint/no-base-to-string': 'off',
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-confusing-void-expression': 'error',
            '@typescript-eslint/no-dynamic-delete': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-empty-interface': [
                'error',
                { allowSingleExtends: false },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-invalid-void-type': [
                'error',
                {
                    allowInGenericTypeArguments: true,
                    allowAsThisParameter: false,
                },
            ],
            '@typescript-eslint/no-magic-numbers': [
                'error',
                {
                    ignoreDefaultValues: true,
                    ignore: [0, 1],
                },
            ],
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksSpreads: true,
                    checksConditionals: true,
                    checksVoidReturn: false,
                },
            ],
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-shadow': [
                'error',
                {
                    ignoreTypeValueShadow: false,
                    ignoreFunctionTypeParameterNameValueShadow: false,
                },
            ],
            '@typescript-eslint/no-this-alias': [
                'error',
                {
                    allowDestructuring: false,
                    allowedNames: [],
                },
            ],
            '@typescript-eslint/no-type-alias': 'off',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
                'error',
                {
                    allowComparingNullableBooleansToTrue: false,
                    allowComparingNullableBooleansToFalse: false,
                },
            ],
            '@typescript-eslint/no-unnecessary-condition': [
                'error',
                {
                    allowConstantLoopConditions: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                },
            ],
            '@typescript-eslint/no-unnecessary-qualifier': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': [
                'error',
                { typesToIgnore: [] },
            ],
            '@typescript-eslint/no-unnecessary-type-arguments': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-literal-enum-member': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': [
                'error',
                {
                    ignoreConditionalTests: false,
                    ignoreMixedLogicalExpressions: false,
                },
            ],
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-readonly': [
                'error',
                { onlyInlineLambdas: false },
            ],
            '@typescript-eslint/prefer-reduce-type-parameter': 'error',
            '@typescript-eslint/prefer-regexp-exec': 'error',
            '@typescript-eslint/prefer-return-this-type': 'off',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/promise-function-async': [
                'error',
                {
                    allowAny: false,
                    allowedPromiseNames: [],
                    checkArrowFunctions: true,
                    checkFunctionDeclarations: true,
                    checkFunctionExpressions: true,
                    checkMethodDeclarations: true,
                },
            ],
            '@typescript-eslint/require-array-sort-compare': [
                'error',
                { ignoreStringArrays: true },
            ],
            '@typescript-eslint/restrict-plus-operands': ['error'],
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowNumber: true,
                    allowBoolean: true,
                    allowAny: false,
                    allowNullish: false,
                },
            ],
            '@typescript-eslint/sort-type-union-intersection-members': 'off',
            '@typescript-eslint/strict-boolean-expressions': [
                'error',
                {
                    allowString: true,
                    allowNumber: true,
                    allowNullableObject: true,
                    allowNullableBoolean: false,
                    allowNullableString: true,
                    allowNullableNumber: false,
                    allowAny: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                },
            ],
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/triple-slash-reference': 'error',
            '@typescript-eslint/typedef': 'error',
            '@typescript-eslint/unbound-method': [
                'error',
                { ignoreStatic: false },
            ],
            '@typescript-eslint/unified-signatures': 'error',
        },
        languageOptions: {
            parser: await import('@typescript-eslint/parser')
        }
    },
    {
        files: ['**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-magic-numbers': 'off',
            '@typescript-eslint/unbound-method': 'off',
            'max-lines-per-function': 'off',
            'max-nested-callbacks': 'off',
            'no-restricted-imports': 'off',
            'jest/consistent-test-it': [
                'error',
                {
                    fn: 'test',
                    withinDescribe: 'test',
                },
            ],
            'jest/expect-expect': 'error',
            'jest/max-nested-describe': ['error', { max: 3 }],
            'jest/no-alias-methods': 'error',
            'jest/no-commented-out-tests': 'error',
            'jest/no-conditional-expect': 'error',
            'jest/no-disabled-tests': 'error',
            'jest/no-done-callback': 'error',
            'jest/no-duplicate-hooks': 'error',
            'jest/no-export': 'error',
            'jest/no-focused-tests': 'error',
            'jest/no-hooks': 'off',
            'jest/no-identical-title': 'error',
            'jest/no-interpolation-in-snapshots': 'error',
            'jest/no-jasmine-globals': 'error',
            'jest/no-mocks-import': 'error',
            'jest/no-restricted-matchers': 'error',
            'jest/no-standalone-expect': 'error',
            'jest/no-test-prefixes': 'error',
            'jest/no-test-return-statement': 'error',
            'jest/prefer-called-with': 'error',
            'jest/prefer-expect-assertions': 'off',
            'jest/prefer-expect-resolves': 'error',
            'jest/prefer-hooks-on-top': 'error',
            'jest/prefer-lowercase-title': 'off',
            'jest/prefer-spy-on': 'error',
            'jest/prefer-strict-equal': 'error',
            'jest/prefer-to-be': 'error',
            'jest/prefer-to-contain': 'error',
            'jest/prefer-to-have-length': 'error',
            'jest/prefer-todo': 'error',
            'jest/require-hook': 'off',
            'jest/require-to-throw-message': 'error',
            'jest/require-top-level-describe': 'error',
            'jest/unbound-method': 'error',
            'jest/valid-describe-callback': 'error',
            'jest/valid-expect': 'error',
            'jest/valid-expect-in-promise': 'error',
            'jest/valid-title': 'error',
        }
    }
];
