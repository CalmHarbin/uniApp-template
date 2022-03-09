<template>
    <uni-rate :size="18" :value="5" />
    <view>hello-world</view>

    <view>你当前的城市是: {{ city }}，经纬度：{{ laglnt.lat }}，{{ laglnt.lng }}</view>

    <button @click="getUserInfo">获取mock数据</button>
    <button @click="apiTest">调用代理接口</button>
    <button @click="open">打开弹窗</button>

    <uni-popup ref="popup" type="bottom" background-color="#fff">
        <image class="logo" src="@/assets/logo.png" />
    </uni-popup>
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
        const popup = ref()

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
                .get('/sug', {
                    code: 'utf-8',
                    q: '苹果'
                })
                .then((res) => {
                    console.log(res)
                })
        }

        const open = () => {
            popup.value.open()
        }

        return { city, laglnt, popup, getUserInfo, apiTest, open }
    }
    // mounted() {
    //     console.log('this访问store', this.$store.state.system.title)
    // }
})
</script>
