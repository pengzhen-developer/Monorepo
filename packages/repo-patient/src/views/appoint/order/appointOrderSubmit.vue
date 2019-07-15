<template>
    <div>
            预约挂号订单提交页
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                data: {},
            }
        },
        created() {
            const params = peace.util.decode(this.$route.params.json)
            //
            // peace.service.xx.xx({
            //     xx: params.xx
            // }).then(res => {
            //     this.data = res.data
            // })

        },
        methods: {}
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

</style>