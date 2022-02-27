## uniApp-template

实现功能

-   使用 `vite` + `vue3`
-   使用 `typescript`
-   使用 `scss` 来编写 css
-   使用 `Eslint` + `Stylelint` + `Prettier` 来规范和格式化代码

### 生成基本框架

```sh
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

或者直接从 [gitee](https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite-ts.zip) 上下载。

### 做一些简单的配置

我们对生成的基础框架做一些自定义的配置。

1. 规范目录
2. 配置别名
3. 配置代理
4. 打包调整

修改 vite.config.ts 文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果这里飘红则安装下依赖。pnpm add @types/node -D
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        // 请求代理
        proxy: {
            '/dev': {
                target: 'https://xxx.com/api',
                changeOrigin: true,
                // 路径重写，去掉/dev
                rewrite: (path) => path.replace(/^\/dev/, '')
            }
        }
    },
    build: {
        // 禁用 gzip 压缩大小报告，以提升构建性能
        brotliSize: false,
        /** 配置打包js,css,img分别在不同文件夹start */
        assetsDir: 'static/img/',
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
        /** 配置打包问js,css,img分别在不同文件夹end */
    }
})
```

同时 tsconfig.json 添加写别名使编辑器可以识别

```json
{
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
}
```

然后安装依赖，运行到 H5 看看是否成功。

```sh
# 安装依赖
pnpm i

# 运行
npm run dev:h5
```

<img src="http://file.calmharbin.icu/20220227174631.png" height="400" style="border: 1px solid #ddd">

### 添加 eslint

```
pnpm add eslint -D
```

生成配置文件

```
npx eslint --init
```

-   How would you like to use ESLint? （你想如何使用 ESLint?）
    <img src="http://file.calmharbin.icu/c1424c45d06d4900807b3e0435911f4e_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）

-   What type of modules does your project use?（你的项目使用哪种类型的模块?）
    <img src="http://file.calmharbin.icu/26e9ec1fd2934265847b0dabe908e6be_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 JavaScript modules (import/export)

-   Which framework does your project use? （你的项目使用哪种框架?）
    <img src="http://file.calmharbin.icu/412df4bebb2c43b2858d5093652cc8ca_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Vue.js

-   Does your project use TypeScript?（你的项目是否使用 TypeScript？）
    <img src="http://file.calmharbin.icu/ee8aa15a0de84f2d9f16402f6870b3cd_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Yes

-   Where does your code run?（你的代码在哪里运行?）
    <img src="http://file.calmharbin.icu/c86eb167b09a414dabb7ec3edb70a377_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）

-   How would you like to define a style for your project?（你想怎样为你的项目定义风格？）
    <img src="http://file.calmharbin.icu/f8beb21b44a14dbba7e0b9153d1f6a03_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Use a popular style guide（使用一种流行的风格指南）

-   Which style guide do you want to follow?（你想遵循哪一种风格指南?）
    <img src="http://file.calmharbin.icu/596c3755247a45a990d8c847d76fdad1_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Airbnb（github 上 star 最高）

-   What format do you want your config file to be in?（你希望你的配置文件是什么格式?）
    <img src="http://file.calmharbin.icu/6217a3458af34010bd8a3a55a0c03629_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 JavaScript

-   Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）
    <img src="http://file.calmharbin.icu/6b1be913778348d1a59c2d7ea4c27a0c_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 No，根据提示需要安装的依赖包，我们自己使用 pnpm 安装。

```sh
pnpm add -D eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
```

增加 eslint 忽略文件 `src/.eslintignore`

```
index.html
*.d.ts
```

### 安装 stylelint

```
pnpm add -D stylelint stylelint-config-rational-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard-scss stylelint-order
```

根目录下新增配置文件 `stylelint.config.js`

```js
module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order'
    ],
    rules: {
        // 使用4格缩进
        indentation: 4,
        // 可以使用rpx单位
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
    }
}
```

增加 stylelint 的忽略文件 `src/.stylelintignore`

```
**/*.js
**/*.ts
dist
node_modules
index.html
*.md
```

### 安装 prettier

```sh
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier stylelint-config-prettier
```

添加 prettier 的配置文件 `.prettierrc`

```
{
    "trailingComma": "none",
    "printWidth": 100,
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "endOfLine": "auto"
}

```

修改 `.eslintrc.js` 来解决与 eslint 的冲突

```js
extends: [
    'plugin:prettier/recommended' // 一定要放在最后一项
],
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
    ]
}
```

修改 `stylelint.config.js` 来解决与 stylelint 的冲突

```js
extends: [
    'stylelint-config-prettier' // 一定要放在最后一项
]
```

### 常见报错及解决办法

##### **eslint 报：使用别名报错 import/no-unresolved**

<img src="http://file.calmharbin.icu/WEBRESOURCE04d1585a4f7961d2c1cf34a531fb9b69.png" width="400">

安装

```
pnpm add eslint-import-resolver-alias -D
```

修改 `.eslintrc.js`

```
settings: {
    'import/resolver': {
        alias: {
            map: [['@', './src']],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
    }
},
rules: {
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
```

##### **stylelint 报错：Unknown word**

<img src="http://file.calmharbin.icu/WEBRESOURCE31c62db7289cb34d48a11f6a84d8a17c.png" width="400">

将报错的文件添加到忽略文件（`.stylelintignore`）即可
