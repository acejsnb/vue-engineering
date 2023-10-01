module.exports = {
    env: {
        es2021: true,
        node: true
    },
    globals: {
        document: true,
        localStorage: true,
        window: true,
        Babel: true,
        Vue: true,
        VueRouter: true,
        h: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
        ecmaFeatures: {
            // jsx: true,
            tsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        },
    },
    plugins: [
        "@typescript-eslint",
        "vue", 'import', 'node', 'promise'
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'quotes': [2, 'single'],
        'global-require': 0,
        'space-before-function-paren': 0,
        'no-plusplus': 0,
        'no-tabs': 0,
        'no-param-reassign': 0,
        'no-undef': 1,
        'no-unused-vars': 1,
        'dot-notation': 1,
        'no-nested-ternary': 1,
        'consistent-return': 0,
        'no-unused-expressions': 0,
        // 'comma-dangle': [2, 'always-multiline'],
        'comma-dangle': [2, 'never'],
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'import/no-unresolved': [
            2,
            {ignore: ['.js', '.ts', '.tsx', '^@/', '^./', '^../', '^../Types']}
        ],
        'import/extensions': [
            'error',
            {
                js: 'never',
                ts: 'never',
                tsx: 'never',
                vue: 'always',
                styl: 'always',
                less: 'always',
                css: 'always',
                svg: 'always',
                png: 'always',
                jpg: 'always',
                mp4: 'always',
                webm: 'always',
                json: 'always',
            }
        ],
        'vue/no-multiple-template-root': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-comment': 1,
        'vue/require-valid-default-prop': 0,
        'vue/html-indent': [1, 4],
        'vue/singleline-html-element-content-newline': 0,
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 5
            },
            'multiline': {
                'max': 1
            }
        }]
    }
}
