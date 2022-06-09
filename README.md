## uniApp-template

### 前言

因为每次在开发新项目时，都需要一个开箱即用的基础框架，避免重新开始搭建而浪费时间，遂记录下从零开始搭建一个开箱即用的框架。随着前端的发展，未来版本的更新需要重新搭建框架时也可以作个参考。

实现功能

-   <input type="checkbox" checked>使用 `Vue3` 进行开发</input>
-   <input type="checkbox" checked>构建工具 使用 `Vite`</input>
-   <input type="checkbox" checked>使用 `Vuex`</input>
-   <input type="checkbox" checked>集成 `Typescript`</input>
-   <input type="checkbox" checked>集成 `Scss` 来编写 css</input>
-   <input type="checkbox" checked>集成 `Eslint` + `Stylelint` + `Prettier` 来规范和格式化代码</input>
-   <input type="checkbox" checked>环境区分</input>
-   <input type="checkbox" checked>封装 `uni-request` 请求</input>
-   <input type="checkbox" checked>集成 `Mock` 辅助开发</input>
-   <input type="checkbox" checked>集成 `uni-ui`</input>

项目整体目录

```ts
├── dist/                   // 打包文件的目录
├── env/                    // 环境配置目录
|   ├── .env.development    // 开发环境
|   ├── .env.production     // 生产环境
├── mock/                   // mock
|   ├── index.ts
├── src/
|   ├── assets/             // 存放图片
|   ├── components/         // 自定义组件
|   ├── pages/              // 页面
|   ├── store/
|   |   ├── index.ts        // store 配置文件
|   |   ├── index.d.ts      // 声明文件
|   |   └── modules
|   |       └── system.ts   // 自己的业务模块，这里写|个示例
|   ├── styles/             // 样式文件
|   ├── App.vue
|   ├── env.d.ts
|   ├── main.ts
|   ├── manifest.json
|   ├── pages.json
|   ├── shims-vue.d.ts
|   └── uni.scss
├── .eslintignore           // eslint忽略文件
├── .eslintrc.js            // eslint配置文件
├── .gitignore              // git忽略文件
├── .prettierrc             // prettier配置文件
├── .stylelintignore        // stylelint忽略文件
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── stylelint.config.js     // stylelint配置文件
├── tsconfig.json
└── vite.config.ts
```

### 生成基本框架

使用官方提供 Vue3/Vite 版本的模板来生成我们的基础项目。

```cmd
npx degit dcloudio/uni-preset-vue#vite-ts uniApp-template
```

网络不好可以或者直接从 [gitee](https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite-ts.zip) 上下载。

### 做一些简单的配置

基础模板中功能比较少，我们对生成的基础框架添加一些自定义的配置。

1. 规范目录
2. 配置别名 `@` 来表示 `src` 目录
3. 配置代理解决开发环境跨域的问题
4. 打包调整生成规范的文件

修改 vite.config.ts 文件

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 因为uni.scss可以全局使用，这里根据自己的需求调整
                additionalData: '@import "./src/styles/global.scss";'
            }
        }
    },
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        port: 8080,
        // 请求代理
        proxy: {
            // 个人习惯，这里就用/dev作为前缀了
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
        /** 配置h5打包js,css,img分别在不同文件夹start */
        assetsDir: 'static/img/',
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
        /** 配置h5打包js,css,img分别在不同文件夹end */
    }
})
```

在 `tsconfig.json` 中添加配置，使编辑器可以识别我们的别名。

```tson
{
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
}
```

最后使用 `pnpm` 安装依赖，然后运行到 H5 看看是否成功。

```sh
# 安装依赖
pnpm i

# 运行
npm run dev:h5
```

<div style="display: inline-block;border: 1px solid #ddd;font-size: 0;">
    <img src="http://file.calmharbin.icu/20220227174631.png" height="400">
</div>

### 配置 vuex

因为基础模板中已经给我们依赖了 vuex，所以我们这里就不用再安装了，我们需要新建一个 `src/store` 文件夹来管理我们的 `store`。

```
└── src/
    ├── store/
        ├── index.ts  // store 配置文件
        ├── index.d.ts  // 声明文件
        ├── modules
            ├── system.ts // 自己的业务模块，这里写一个示例
```

首先编写我们的声明文件，这里对我们所有的 store 添加一个声明，以便我们在使用的使用编辑器有提示。

`src/store/index.d.ts`

```ts
import { rootStateType } from './index'
import { systemStateType } from './modules/system'

export interface StateType extends rootStateType {
    system: systemStateType
}
```

然后在配置文件中来实例化 store

`src/store/index.ts`

```ts
import { createStore } from 'vuex'
import { StateType } from './index.d'

// 批量引入其他module，
const files = import.meta.globEager('./modules/*.ts') // vite的写法
const keys = Object.keys(files)

const modules: any = {}

keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        // 提取文件的名字作为模块名
        modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
    }
})

/** 全局的state,这个看自己的需求，如果有用到就在createStore中添加 */
export interface rootStateType {}

export default createStore<StateType>({
    modules
})
```

在 modules 文件夹中根据自己的业务来创建模块，同时在 index.d.ts 中加入声明。例如：`src/store/modules/system.ts`

```ts
import { Module } from 'vuex'
import { rootStateType } from '@/store'

export interface systemStateType {
    title: string
}

const systemModule: Module<systemStateType, rootStateType> = {
    namespaced: true,
    state: () => ({
        title: '你好，我是uni-app'
    })
}

export default systemModule
```

在 `main.ts` 文件中挂载 vuex

```ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
    const app = createSSRApp(App).use(store)
    return {
        app
    }
}
```

最后使用 vuex，常见的两种用法。

```ts
// 使用this
this.$store.state.system.title

// 使用useStore
import { useStore } from 'vuex'
const store = useStore()
console.log(store.state.system.title)
```

<img src="http://file.calmharbin.icu/20220227223112.png" width="400">

到这一步我们已经可以正常使用 vuex 了，但是此时会发现编辑器对 store 没有检测到 ts 类型声明。需要我们扩展下 ts 类型声明。

创建 `src/shims-vue.d.ts`。名字其实无所谓，只要是在 src 下的.d.ts 文件就行，这里延续 vue 风格的命名。

```ts
// import 'vue' // 必须要引入vue,否则就成了覆盖
import { StateType } from '@/store/index.d'
import { InjectionKey } from 'vue'
import { Store } from 'vuex'

/**
 * 这里为什么用vue，而不用@vue/runtime-core，是因为使用pnpm安装依赖是，node_modules中没有@vue/runtime-core，
 * 会导致找不到模块而类型声明失败。
 */
// declare module '@vue/runtime-core' {
declare module 'vue' {
    interface ComponentCustomProperties {
        // 这里扩展this.$store，还可以在这里对this添加其他的声明
        $store: Store<StateType>
    }
}

// 扩展useStore声明
declare module 'vuex' {
    export function useStore<S = StateType>(injectKey?: InjectionKey<Store<S>> | string): Store<S>
}

// 这个导出一个东西也可以，或者上面引入vue
export {}
```

<img src="http://file.calmharbin.icu/20220227224020.png" width="400">

### 集成 eslint

安装 `eslint`

```
pnpm add eslint -D
```

生成 `eslint` 配置文件，这一块参考是参考这篇文件写的。[原文地址](https://juejin.cn/post/6951649464637636622#heading-13)

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

    我们这里选择 No，根据提示需要安装的依赖包，我们自己使用 pnpm 安装。注意 eslint 的版本，之前我们安装过可以不再安装了。

```sh
pnpm add -D eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
```

修改`.eslintrc.js`文件

```
// 因为我们使用的是 vue3，所以使用 vue3 的校验规则
plugin:vue/essential 修改成 plugin:vue/vue3-recommended

// 增加uni的声明
globals: {
    /** 避免uni报错 */
    uni: true,
    UniApp: true
},
```

增加 eslint 忽略文件 `src/.eslintignore`

```
index.html
*.d.ts
```

### 集成 stylelint

我们可以使用 stylelint 来规范我们的 css 写法。

```
pnpm add -D stylelint stylelint-config-rational-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard-scss stylelint-order
```

根目录下新增配置文件 `stylelint.config.js`

```ts
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

### 集成 prettier

我们使用 prettier 来搭配 eslint 和 stylelint 使用。

安装依赖

```sh
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier stylelint-config-prettier
```

根目录下添加 prettier 的配置文件 `.prettierrc`

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

```ts
extends: [
    // ...
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

```ts
extends: [
    'stylelint-config-prettier' // 一定要放在最后一项
]
```

完成以上步骤，就可以愉快的敲代码了。

#### 你可能遇到的问题：

##### **eslint 报：使用别名报错 import/no-unresolved**

<img src="http://file.calmharbin.icu/WEBRESOURCE04d1585a4f7961d2c1cf34a531fb9b69.png" width="400">

解决办法：

安装依赖

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

解决办法：将报错的文件添加到忽略文件（`.stylelintignore`）即可

##### **vite.config.ts 文件报错**

<img src="http://file.calmharbin.icu/20220227225628.png" width="400">

解决办法：配置 eslint 规则

```ts
rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
}
```

**编译器宏，如 defineProps 和 defineEmits 生成 no-undef 警告**

<img src="http://file.calmharbin.icu/WEBRESOURCEbd009c10b10265b15d30b93b88477b6c.png" width="400">

修改 `.eslintrc.js`

```
env: {
    'vue/setup-compiler-macros': true
}
```

### 环境区分

实现功能：

-   可以直接区分开发环境和生产环境
-   自定义环境变量增加 typescript 提示

在根目录下新建 env 文件夹用来存放环境变量配置文件，同时修改 vite 配置（环境变量的根目录）。

> 因为 vite 默认是将项目根目录作为环境变量配置的目录，所以我们需要修改下 vite 的配置指向 env 文件夹

修改 `vite.config.js`

```ts
export default defineConfig({
    envDir: resolve(__dirname, 'env')
})
```

同时新增 env 文件夹

```ts
├── env/
    ├── .env.development        // 开发环境
    ├── .env.production         // 生产环境
    ├── index.d.ts              // 声明文件
```

需要检查下 `tsconfig.json` 文件是否包含了 `env/index.d.ts`，如果没有需要我们添加一下。

```ts
"include": ["env/index.d.ts"]
```

编辑 `src/.env.d.ts` 文件增加自定义变量的声明

```ts
/** 扩展环境变量import.meta.env */
interface ImportMetaEnv {
    /** 这里增加自定义的声明 */
    VITE_REQUEST_BASE_URL: string
}
```

### 封装 `uni-request` 请求

实现功能：

-   统一配置接口地址
-   统一设置超时时间/报文格式/报文加密
-   统一身份认证
-   统一处理登录超时/接口异常提示
-   统一返回接口格式

新建 `src/utils/request/index.ts` 用来存放我们的代码。

```ts
/**
 * uni-request请求封装
 * 1. 统一配置接口地址
 * 2. 统一设置超时时间/报文格式/报文加密
 * 3. 统一身份认证
 * 4. 统一处理登录超时/接口异常提示
 * 5. 统一返回接口格式
 */

type responseType = {
    code: number
    success: boolean
    msg: string
    result: any
}

const request = (config: UniApp.RequestOptions) => {
    let url: string
    if (/^(http|https):\/\/.*/.test(config.url)) {
        // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
        url = config.url
    } else {
        url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
    }
    return new Promise<responseType>((resolve, reject) => {
        uni.request({
            ...config,
            url,
            /** 统一设置超时时间 */
            timeout: config.timeout || 60000,
            header: {
                ...config.header,
                /** 统一报文格式 */
                'Content-Type': 'application/json;charset=UTF-8'
                /** 统一身份认证 */
                // Authorization: Token
            },
            success(res) {
                // 200状态码表示成功
                if (res.statusCode === 200) {
                    resolve(res.data as any)
                    return
                }
                /**
                 * 这里可以做一些登录超时/接口异常提示等处理
                 */
                reject(res.data)
            },
            fail(result) {
                reject(result)
            }
        })
    })
}

export default {
    /**
     * get请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    get: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'GET'
        })
    },
    /**
     * post请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    post: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'POST'
        })
    }
}
```

使用方式

```ts
import request from '@/utils/request'

request
    .get('/api/getList', {
        page: 1,
        size: 20
    })
    .then((res) => {
        console.log(res)
    })
```

### 集成 `Mock` 辅助开发

> 因为 mockjs 只适用于 h5，故小程序部分自行考虑。

实现功能：

-   统一管理我们想要 mock 的接口
-   便捷切换是否 mock
-   自由控制哪些接口 mock，哪些接口真实请求
-   对于调用接口的地方是否 mock 是无感知的

比如：

```ts
import request from '@/utils/request'
/**
 * 这样写，既可以是mock数据，也可以是调用接口。
 */
request.get('/getUserInfo')
```

安装 `mock`

```sh
pnpm add mockjs
pnpm add -D @types/mockjs
```

前面我们在环境变量里添加了统一接口地址。我们先制定如下规则：

```
# 请求接口地址
VITE_REQUEST_BASE_URL = /dev # 这样可以直接使用代理请求
VITE_REQUEST_BASE_URL = /dev/mock # 这样就可以开启mock
VITE_REQUEST_BASE_URL = https://xxx.com/api # 这样就是直接请求接口
```

根目录下创建 `mock/index.ts` 文件来存放我们的 Mock 规则。

```ts
import Mock from 'mockjs'

// 基于我们制定的规则，这里必须做下判断，这个很重要。
if (/\/mock$/.test(import.meta.env.VITE_REQUEST_BASE_URL)) {
    // 这里添加 /getUserInfo 这个接口mock数据
    Mock.mock(`${import.meta.env.VITE_REQUEST_BASE_URL}/getUserInfo`, {
        code: 200,
        success: true,
        msg: '',
        result: {
            name: Mock.Random.cname()
        }
    })
}
```

在 main.js 中引入下。（为什么要引入？不引入代码怎么执行啊）

```ts
import '../mock'
```

接下来改造我们封装的请求。

修改 `src/utils/request/index.ts`

```ts
import Mock from 'mockjs'

if (/^(http|https):\/\/.*/.test(config.url)) {
    // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
    url = config.url
    // eslint-disable-next-line no-underscore-dangle
} else if (Mock._mocked[import.meta.env.VITE_REQUEST_BASE_URL + config.url]) {
    // 如果是mock数据,Mock._mocked上记录有所有已设置的mock规则。
    url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
} else {
    /**
     * 开启mock时需要去掉mock路径,不能影响正常接口了。
     * 如果碰巧你接口是 /api/mock/xxx这种,那VITE_REQUEST_BASE_URL就配置/api/mock/mock吧
     */
    url = import.meta.env.VITE_REQUEST_BASE_URL.replace(/\/mock$/, '') + config.url
}
```

> 如果 `Mock._mocked` 报 `类型“typeof mockjs”上不存在属性“_mocked”`，需要我们扩展下声明

```ts
// src/shims-vue.d.ts

// 扩展mock
declare module 'mockjs' {
    /** 所有已注册的mock规则  */
    const _mocked: Record<string, any>
}
```

### 集成 `uni-ui`

因为我们使用的是 `vite` 开发的，所以我们只能使用 `npm+easycom` 的方式集成

安装 uni-ui

```
pnpm add @dcloudio/uni-ui
```

打开项目根目录下的 pages.json 并添加 easycom 节点：

```jsonc
// pages.json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            // uni-ui 规则如下配置
            "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
        }
    },

    // 其他内容
    "pages": [
        // ...
    ]
}
```

然后就可以直接使用了

> 注意无需再次引入

```vue
<uni-rate :size="18" :value="5" />
```

H5 和小程序效果图

<img src="http://file.calmharbin.icu/20220309234926.png" width="400" style="flex: 0 0 200px;" />

<img src="http://file.calmharbin.icu/20220309234817.png" width="400" />

### 写在最后

如果你想快速的体验 vue3 开发，你可以拉取我的源码直接开发。

> github: https://github.com/CalmHarbin/uniApp-template

创作不易、欢迎 ⭐

TODO：

-   <input type="checkbox">使用 `Hbuilder` 创建 `uni-app` 模板</input>
-   <input type="checkbox">搭建一个 `Taro+vue3` 模板</input>
