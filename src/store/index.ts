import { createStore } from 'vuex'

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

// 全局的state,暂无
export interface rootStateType {}

export default createStore({
    modules
})
