import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import '../mock'

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
    const app = createSSRApp(App).use(store)
    return {
        app
    }
}

// --------------------------------------------------
// 重写 uni.hideLoading：默认添加 { noConflict: true }
// --------------------------------------------------
// eslint-disable-next-line no-underscore-dangle
const __originalHideLoading = uni.hideLoading
uni.hideLoading = (options?: any) => {
    const normalizedOptions = options && typeof options === 'object' ? { ...options } : {}
    if (normalizedOptions.noConflict === undefined) {
        normalizedOptions.noConflict = true
    }
    // @ts-ignore - 兼容不同平台的签名
    return __originalHideLoading(normalizedOptions)
}
