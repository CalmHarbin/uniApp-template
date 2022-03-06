<template>
    <view>hello-world</view>

    <view>你当前的城市是: {{ city }}，经纬度：{{ laglnt.lat }}，{{ laglnt.lng }}</view>

    <button @click="getUserInfo">获取mock数据</button>
    <button @click="apiTest">调用豆瓣接口</button>
</template>

<script lang="ts">
import request from '@/utils/request'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'HelloWorld',
    setup() {
        const store = useStore()
        const city = ref('')
        const laglnt = reactive({
            lat: '',
            lng: ''
        })

        console.log('useStore访问store', store.state.system.title)

        // 这个这就接口格式不规范，就用any了
        request.get('http://ip-api.com/json').then((res: any) => {
            console.log(res)
            city.value = res.city
            laglnt.lat = res.lat
            laglnt.lng = res.lon
        })

        const getUserInfo = () => {
            request.get('/getUserInfo').then((res) => {
                console.log(res.result)
            })
        }

        const apiTest = () => {
            request
                .get('/j/puppy/frodo_landing', {
                    include: 'anony_home'
                })
                .then((res) => {
                    console.log(res)
                })
        }

        return { city, laglnt, getUserInfo, apiTest }
    }
})
</script>
