<template>
    <div>
        <!--        医生信息-->
        <div class="card">
            <div class="card-avatar avatar-circular">
                <img class="" src="doctorInfo.avartor" />
            </div>
            <div class="card-body">
                <div class="card-name">{{doctorInfo.name}}
                    <div class="card-small">
                        {{doctorInfo.doctorTitle}} {{doctorInfo.deptName}}</div>
                </div>
            </div>
        </div>
        <div class="dl-addr">
            <div class="dt">就诊医院</div>
            <div class="dd">华中科技大学同济医学院附属医院</div>
        </div>
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