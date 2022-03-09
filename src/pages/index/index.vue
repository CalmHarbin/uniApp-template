<template>
    <view class="content">
        <image class="logo" src="@/assets/logo.png" />
        <view>哈哈哈哈</view>
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>

        <hello-world></hello-world>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from '@/components/hello-world/index.vue'

const title = ref('Hello')
</script>

<!-- <script lang="ts">
// import { defineComponent, ref } from 'vue'
import HelloWorld from '@/components/hello-world/index.vue'

export default {
    name: 'PageIndex',
    components: { HelloWorld },
    data() {
        return {
            title: 'Hello'
        }
    },
    // setup() {
    //     const title = ref('Hello')

    //     return { title }
    // },
    mounted() {
        console.log(33)
    }
}
</script> -->

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $bg-color;
}

.logo {
    width: 200rpx;
    height: 200rpx;
    margin: 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    color: #8f8f94;
    font-size: 36rpx;
}
</style>
