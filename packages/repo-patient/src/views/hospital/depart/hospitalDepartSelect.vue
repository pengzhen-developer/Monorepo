<template>
    <div>
        <van-tree-select
                :items="items"
                :main-active-index="mainActiveIndex"
                :active-id="activeId"
                @navclick="onNavClick"
                @itemclick="onItemClick"
        />
    </div>
</template>

<script>
    import peace from '@src/library';

    export default {
        props: {},
        data() {
            return {
                data: {},
                hsp: {},
                items: [],
                checkDept: {},
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: '',
                deptParent: [],
                deptChild: [],
            }
        },
        created() {
            let params = JSON.parse(window.atob($peace.$route.params.json));
            this.hsp = params || {};
            this.getDeptList({},() =>{
                this.deptParent.map((item) =>{
                    // this.initDeptChild();
                    this.getDeptList({
                        deptId: item.id,
                        name: item.netdeptName,
                        level: 2
                    })
                    return;
                })
            })
        },
        methods: {
            // initDeptChild: function () {
            //     var me = this;
            //
            //     me.getDeptList({
            //         deptId: this.deptParent[0].id,
            //         name: this.deptParent[0].netdeptName,
            //         level: 2
            //     })
            // },
            getDeptList(obj, callback) {
                let data, arr = [];

                data = {
                    netHospitalId: obj.netHospitalId || this.hsp.netHospitalId || '',
                    deptId: obj.deptId || this.hsp.deptId || '',
                    level: obj.level || this.hsp.level || 1
                };

                peace.service.hospital.getDeptList(data).then(res => {
                    // let me = this;

                    if (data.level == 1) {
                        this.deptParent = res.data.list || [];
                        res.data.list.map(item => {
                            return arr.push({
                                text: item.netdeptName,
                                id: item.id
                            })
                        })
                        this.items = arr;
                        this.hospitalInfo = res.data.hospitalInfo;
                    }else {
                        this.deptChild = res.data.list || [];
                        this.items.map(item => {
                            if (obj.deptId == item.id) {
                                this.deptChild.map(it => {
                                    return arr.push({
                                        text: it.netdeptName,
                                        id: it.id
                                    })
                                })
                                item.children = arr;
                            }
                            return;
                        })
                    }
                    console.log(this.items)
                    callback && callback()
                })
            },
            onNavClick(index) {
                this.mainActiveIndex = index;
            },
            onItemClick(data) {
                this.activeId = data.id;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

</style>