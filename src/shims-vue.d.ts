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

// 扩展mock
declare module 'mockjs' {
    /** 所有已注册的mock规则  */
    const _mocked: Record<string, any>
}

// 这个导出一个东西也可以，或者上面引入vue
export {}
