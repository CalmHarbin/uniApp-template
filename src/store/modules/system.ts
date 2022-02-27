import { Module } from 'vuex'
import { rootStateType } from '@/store'

export interface systemStateType {
    title: string
}

const moduleApp: Module<systemStateType, rootStateType> = {
    namespaced: true,
    state: () => ({
        title: '你好，我是uni-app'
    })
}

export default moduleApp
