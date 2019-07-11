<template>

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
            let params = JSON.parse(window.atob(.$route.params.json)
        )
            ;

            peace.service.xx.xx({
                xx: params.xx
            }).then(res => {
                this.data = res.data
            })

        },
        methods: {}
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

</style>

</style>