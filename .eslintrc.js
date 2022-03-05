module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'airbnb-base',
        // 一定要放在最后一项
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    globals: {
        /** 避免uni报错 */
        uni: true,
        UniApp: true
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'none',
                printWidth: 100,
                tabWidth: 4,
                semi: false,
                singleQuote: true,
                endOfLine: 'auto'
            }
        ],
        // 解决vite+airbnb导致eslint报错import/extensions
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
    }
}
