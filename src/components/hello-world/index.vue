<template>
    <view>hello-world</view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'hello-world',
    setup() {
        const store = useStore()
        console.log('useStore访问store', store.state.system.title)
    },
    mounted() {
        console.log('this访问store', this.$store.state.system.title)
    }
})
</script>
