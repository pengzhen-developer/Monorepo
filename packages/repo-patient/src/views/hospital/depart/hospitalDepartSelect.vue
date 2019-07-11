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
        props: {

        },
        data(){
            return{
                data: {},
                hsp:{},
                items:[],
                checkDept:{},
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: 1,
                deptParent:[],
                deptChild:[],
            }
        },
        created() {
            let params = JSON.parse(window.atob($peace.$route.params.json));
                this.hsp = params;
                this.getDeptList({},function () {
                    this.data.deptParent.length && this.initDeptChild();
                })

        },
        methods: {
            initDeptChild: function(){
                var me = this;

                me.getDeptList({
                    deptId: this.deptParent[0].id,
                    name: this.deptParent[0].netdeptName,
                    level: 2
                })
            },
            getDeptList(obj, callback){
                let me = this, hsp = me.hsp, data, arr=[];

                if(obj.level == 2 && this.checkDept.deptId == obj.deptId){
                    return;
                }

                data = {
                    netHospitalId: obj.netHospitalId || hsp.netHospitalId || '',
                    deptId: obj.deptId || hsp.deptId || '',
                    level: obj.level || hsp.level || 1
                };

                peace.service.hospital.getDeptList(data).then(res => {
                    console.log(res)
                    if (data.level == 1) {
                        this.deptParent = res.data.list || [];
                        this.items = res.data.list.map(item =>{
                            return arr.push({
                                text: item.netdeptName,
                                id: item.id
                            })
                        })
                        this.hospitalInfo = res.data.hospitalInfo;
                    }
                    this.deptChild = (data.level == 1 ? [] : res.data.list);
                    this.hospitalInfo = res.data.hospitalInfo || {};
                    this.checkDept.deptId = (data.level == 2 ? obj.deptId : '');
                    this.checkDept.name = (data.level == 2 ? obj.name : '');
                    this.items.map(item =>{
                        if(this.checkDept.deptId == item.id){
                            item.children = this.deptChild
                        }else {
                            item.children = []
                        }
                        return;
                    })
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