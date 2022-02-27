module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
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
        ]
    }
}
