module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order',
        'stylelint-config-prettier'
    ],
    rules: {
        // 使用4格缩进
        indentation: 4,
        // 可以使用rpx单位
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
    }
}
