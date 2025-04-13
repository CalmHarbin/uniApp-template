import { createStore } from 'vuex'
import { StateType } from './index.d'

// 批量引入其他module，
const files = import.meta.glob('./modules/*.ts', { eager: true }) // vite的新写法
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
