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
                rewrite: path => path.replace(/^\/dev/, '')
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
