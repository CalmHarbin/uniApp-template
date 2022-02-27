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
