<template>
    <div>
        <div class="card" ref="hsp">
            <div class="card-avatar">
                <img class="" :src="hospitalInfo.icon"/>
            </div>
            <div class="card-body">
                <div class="card-name">{{hospitalInfo.name}}</div>
                <div class="block">
                        <div :key="index" v-for="(item,index) in hospitalInfo.deptList" class="card-small">{{ (index == 0 ? '' : ' / ' ) + item}}</div>
                </div>
                <div class="block">
                        <div :key="item" v-for="item in hospitalInfo.tags" class="card-label">
                            {{item}}
                        </div>
                </div>
            </div>
        </div>
        <van-tree-select
                :items="items"
                :height="height"
                :main-active-index="mainActiveIndex"
                :active-id="activeId"
                @navclick="onNavClick"
                @itemclick="onItemClick"/>
    </div>
</template>

<script>
    import peace from '@src/library';

    export default {
        props: {},
        data() {
            return {
                data: {},
                hospitalInfo: {},
                items: [],
                checkDept: {},
                height: 500,
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: '',
                deptParent: [],
                deptChild: [],
            }
        },
        created() {
           const params = peace.util.decode(this.$route.params.json)
            this.hsp = params || {};
            this.getDeptList()
        },
        methods: {
            getDeptList() {
                let data, items = [];

                data = {
                    netHospitalId: this.hsp.netHospitalId
                };
                peace.service.hospital.getDeptList(data).then(res => {
                    res.data.list.map(item =>{
                        items.push({
                            text: item.netdeptName,
                            id: item.id,
                            children: item.childDept.map(it =>{
                                return {
                                    text: it.netdeptName,
                                    id: it.id,
                                };
                            })
                        })
                        return items
                    })
                    this.items = items;
                    this.activeId = items[0].children[0] ? items[0].children[0].id : '';
                    this.hospitalInfo = res.data.hospitalInfo;
                    this.height = +(window.innerHeight - (this.$refs.hsp.offsetHeight + 52));
                })
            },
            onNavClick(index) {
                this.mainActiveIndex = index;

                if(!this.items[index].children.length){
                    this.goDoctorListPage(this.items[index].id)
                }
            },
            onItemClick(data) {
                this.activeId = data.id;
                this.goDoctorListPage(this.activeId)
            },
            goDoctorListPage(deptId){
                let json =  peace.util.encode({
                    deptId,
                    netHospitalId: this.hsp.netHospitalId,
                })

                this.$router.push(`/appoint/doctor/appointDoctorList/${json}`)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

    .content{
        height: 100%;
        overflow: hidden;
    }
    .card{
        border-bottom:1px solid #E8E8E8;
        border-top:1px solid #e8e8e8;
        padding:10px;
        margin: 0;
    }
    .card .card-label{
        margin-top:5px;
        margin-right:5px;
        margin-bottom:5px;

    }
    .van-tree-select__nav-item--active{
        border-color:#00c6ae
    }
    .van-icon-checked:before{
        content: "\F02F";
        color: #00c6ae;
    }
    .van-tree-select__item--active{
        color: #00c6ae;
    }

</style>