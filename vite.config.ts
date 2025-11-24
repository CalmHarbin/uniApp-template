import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve, dirname } from 'path'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'

// 获取当前文件的目录
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url)
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename)

// 自定义插件：在构建完成后复制 unpackage 目录
const copyUnpackagePlugin = () => {
    return {
        name: 'copy-unpackage',
        async closeBundle() {
            try {
                const sourceDir = resolve(__dirname, 'unpackage')
                const destDir = resolve(__dirname, 'dist/build/app/unpackage')

                // 检查源目录是否存在
                const sourceExists = await fs
                    .stat(sourceDir)
                    .then(() => true)
                    .catch(() => false)
                if (!sourceExists) {
                    console.warn('Source directory unpackage does not exist')
                    return
                }

                // 确保目标目录存在
                await fs.mkdir(resolve(__dirname, 'dist/build/app'), { recursive: true })

                // 复制目录的函数
                // eslint-disable-next-line no-inner-declarations
                async function copyDir(src: string, dest: string) {
                    const entries = await fs.readdir(src, { withFileTypes: true })
                    await fs.mkdir(dest, { recursive: true })

                    // eslint-disable-next-line no-restricted-syntax
                    for (const entry of entries) {
                        const srcPath = resolve(src, entry.name)
                        const destPath = resolve(dest, entry.name)

                        if (entry.isDirectory()) {
                            // eslint-disable-next-line no-await-in-loop
                            await copyDir(srcPath, destPath)
                        } else {
                            // eslint-disable-next-line no-await-in-loop
                            await fs.copyFile(srcPath, destPath)
                        }
                    }
                }

                // 执行复制
                await copyDir(sourceDir, destDir)
                console.log('Successfully copied unpackage directory to dist/build/app/unpackage')
            } catch (error) {
                console.error('Error copying unpackage directory:', error)
            }
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    envDir: resolve(__dirname, 'env'),
    plugins: [uni(), copyUnpackagePlugin()],
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
                additionalData: `
                    @use "@/styles/global.scss" as *;
                `,
                api: 'modern' // 使用新的 API
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
                target: 'https://suggest.taobao.com',
                changeOrigin: true,
                // 路径重写，去掉/dev
                rewrite: (path) => path.replace(/^\/dev/, '')
            }
        }
    },
    build: {
        // 禁用 gzip 压缩大小报告，以提升构建性能
        reportCompressedSize: false,
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
