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
        "eqeqeq": 2,
        'comma-dangle': [2, 'never'],
        "newline-after-var": 2,
        "array-bracket-spacing": 0,
        "object-curly-spacing": [0, 'never'],
        "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
        "space-before-blocks": 0,
        "no-irregular-whitespace": 2,
        "space-infix-ops": 2,
        "brace-style": [1, "1tbs"],
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0, //禁止使用debugger
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'import/no-unresolved': [
            2,
            {ignore: ['.js', '.ts', '.tsx', '^@/', '^./', '^../', '^../Types', '^i18n', '^tenant', '^theme']}
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
