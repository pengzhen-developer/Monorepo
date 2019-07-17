<template>
    <div>
        <div class="content" v-if="doctorList.length">
            <div  class="" v-for="(item,index) in doctorList" :key="index">
                <div :class="['card-strip',item.isPrivateDoctor ?  '' : item.isPrivateDoctorOnce ? 'disabled' : '']"
                     v-if="item.isPrivateDoctor || item.isPrivateDoctorOnce">
                    <div class="strip-info"><div class="label-jq">私人医生</div></div>
                    <div class="strip-eye">{{ item.isPrivateDoctor ? item.endTime + '结束' : item.isPrivateDoctorOnce ? item.endTime + '已到期' : ''}}</div>
                </div>
                <div class="card" @click="goHomeIndex(item)" :id="item.doctorId" :index="index">
                    <div class="card-avatar avatar-circular">
                        <img class="" :src="item.avartor" />
                    </div>
                    <div class="card-body">
                        <div class="card-name">{{item.name}}
                            <div class="card-small">{{item.doctorTitle}} {{item.deptName}}</div>
                        </div>
                        <div class="card-small"  v-if="item.hospitalName">{{item.hospitalName}}</div>
                        <div class="card-brief" v-if="item.specialSkill">
                            <div class="span s">擅长：</div>
                            <div class="span xl">{{item.specialSkill}}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="none-page" v-if="!doctorList.length">
            <div class="icon icon_none_doctor"></div>
            <div class="none-text">暂无医生信息</div>
        </div>
    </div>

</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                doctorList: [],
            }
        },
        created() {
            peace.service.patient.getUserDctList().then(res => {
                this.doctorList = res.data || []
                // this.doctorList = [{
                //     "doctorId": "unayuzpaar",  //医生id
                //     "name": "何泰樑",           //医生姓名
                //     "avartor":                   "https://devdoctor.hp.aijiayi.com/data/20190424/20190424101327jbeaxg_500_500.png",//医生头像
                //     "summary": "擅长心脑血管手术，具有丰富", //简介
                //     "specialSkill": "擅长治疗感冒发烧兔兔",//特长
                //     "doctorTitle": "副主任医师",//职称
                //     "nethospitalId": "vpnrstbnvh",//医院id
                //     "hospitalName": "武汉市第一医院",//医院名称
                //     "deptName": "呼吸内科",//一级科室
                //     "netdept_name": "内科",//二级科室
                // },
                //     {
                //         "doctorId": "yhudslljhl",
                //         "name": "罗安康",
                //         "avartor": "https://devdoctor.hp.aijiayi.com/img/doctordefault.png",
                //         "summary": "",
                //         "specialSkill": "",
                //         "doctorTitle": "医师",
                //         "nethospitalId": "cgdsqeyusr",
                //         "hospitalName": "武汉九州通医院",
                //         "deptName": "小儿科",
                //         "netdept_name": "儿科",
                //         "isPrivateDoctorOnce": true,
                //         "endTime": "2019-08-08"
                //     }]
            })

        },
        methods: {
            goHomeIndex(item){
                let json = peace.util.encode({
                    doctorId: item.doctorId
                })

                this.$router.push(`/components/doctorDetail/${json}`)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

    .panel{
        box-sizing: border-box;
        width: 100%;
        box-shadow: none;
        border-bottom: 1px solid #e0e0e0;
        margin: 0;
    }
    .card{
        padding: 10px;
        border-bottom: 1px solid #DEDEDE;
        margin: 0;
    }
    .card-brief{
        color: #999;
    }
    .card .card-brief,.card .p-small{
        display: flex;
        align-items:baseline;
        line-height: 1.3;
        font-size: 13px;
        padding: 7px 0;
    }
    .card .card-small,.card .card-brief{
        /*line-height: 1.3;*/
    }
    .card-brief{

    }
    .card-brief,.p-small{
        overflow: hidden;
    }
    .card-brief .span,.p-small .span{
        position: relative;
        flex: 1;
    }
    .card-brief .span.s,.p-small .span.s{
        flex: 0 0 auto;
        /*width: ;*/
    }
    .card-brief .span.xl{
        flex: 0 1 auto;
        word-wrap: break-word;
        white-space: pre-wrap;
        display:-webkit-box;
        overflow:hidden;
        text-overflow:ellipsis;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        max-height: 32px;
    }
    .p-small .span.m{
        font-size: 15px;
        /*flex: 0 1 auto;*/
    }
    .card-strip{
        padding-top: 10px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    }
    .card-strip .strip-info{
        flex: 1;
    }
    .card-strip .strip-eye{
        flex: none;
        color: #00C6AE;
        padding: 0 15px;
    }

    .label-jq{
        position: relative;
        background: #504C4F;
        padding:2px 4px;
        color: #F7E9B3;
        display: inline-block;
        height: 20px;
        box-sizing: border-box;
        z-index: 3;
        padding-right: 6.5px;
        font-size: 12px;
    }
    .label-jq::after{
        content: '';
        position: absolute;
        right: -10px;
        top: 0;
        width:0;
        height:0;
        border-right:10px solid transparent;
        border-left:10px solid transparent;
        border-top:10px solid #504C4F;
        border-bottom:10px solid #504C4F;
        z-index: 0;
    }
    .card-strip.disabled .strip-eye{
        color:#999999 ;
    }
    .card-strip.disabled .label-jq{
        color: #fff;
        background: #CCCCCC;
    }
    .card-strip.disabled .label-jq::after{
        content: '';
        border-top:10px solid #CCCCCC;
        border-bottom:10px solid #CCCCCC;
    }

</style>