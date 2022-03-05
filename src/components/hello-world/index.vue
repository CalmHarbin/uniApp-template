<template>
    <view>hello-world</view>

    <view>你当前的城市是: {{ city }}，经纬度：{{ laglnt.lat }}，{{ laglnt.lng }}</view>
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

        return { city, laglnt }
    }
})
</script>
