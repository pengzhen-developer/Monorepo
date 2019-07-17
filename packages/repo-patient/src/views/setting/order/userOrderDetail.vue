<template>
    <div>
        <!--TOP-->
        <div class="module nmg">
            <div class="strong">{{page.statusDic[info.orderInfo.orderType][info.orderInfo.orderStatus].text}}</div>
            <div class="brief">{{page.statusDic[info.orderInfo.orderType][info.orderInfo.orderStatus].small}}</div>
            <div class="module-body">
                <div :class="['label', 'blue', 'info.orderInfo.canselState' ? '' : 'disabled']" @click="showCancellPop"
                      v-if="info.orderInfo.orderStatus == '1' || info.orderInfo.orderStatus == '3'">
                    {{info.orderInfo.canselState ? '申请退号' : page.cfgDic[info.orderInfo.cancelType]}}
                </div>
            </div>
        </div>
        <!--医生名片-->
        <div class="card">
            <div class="card-avatar avatar-circular">
                <img class="" :src="info.doctorInfo.avartor" />
            </div>
            <div class="card-body">
                <div class="card-name">
                    {{info.doctorInfo.name}}
                    <div class="card-small">{{info.doctorInfo.doctorTitle}}
                        {{info.doctorInfo.deptName}}
<!--                        <div class="label label-private" wx:if="{{info.doctorInfo.isPrivateDoctor}}">私人医生</div>-->
                    </div>
                </div>
<!--                <div class="card-small">-->
<!--                    {{info.doctorInfo.hospitalName}}-->
<!--                </div>-->
            </div>
        </div>
        <!--订单内容-->
<!--            -->
        <div class="order">
            <div class="dl-addr">
                <div class="dt">就诊医院</div>
                <div class="dd">{{info.doctorInfo.hospitalName}}</div>
            </div>
            <div class="dl-addr">
                <div class="dt">就诊科室</div>
                <div class="dd">{{info.doctorInfo.deptName}}</div>
            </div>
            <div class="dl-addr">
                <div class="dt">门诊时间</div>
                <div class="dd blue">{{info.doctorInfo.outpatientDate}}</div>
            </div>
            <div class="dl-addr">
                <div class="dt">门诊类型</div>
                <div class="dd">{{info.doctorInfo.outpatientType}}</div>
            </div>
            <div class="dl-addr">
                <div class="dt">费　　用</div>
                <div class="dd">￥{{info.doctorInfo.fee}}(挂号费)</div>
            </div>
        </div>
<!--        就诊人-->
        <div class="form-dl">
            <div class="form-dt">就诊人</div>
            <div class="form-dd">
                {{info.doctorInfo.familyName}}/{{info.doctorInfo.diagnoseType}}
            </div>
        </div>
        <!--订单报文-->
        <div class="module pdtb">
            <div class="dl-packet">
                <div class="dt">订单号码</div>
                <div class="dd">
                    {{info.orderInfo.orderNo}}
                </div>
            </div>
            <div class="dl-packet">
                <div class="dt">订单金额</div>
                <div class="dd">
                    {{info.orderInfo.orderMoney}}元
                </div>
            </div>
            <div class="dl-packet">
                <div class="dt">订单时间</div>
                <div class="dd">
                    {{info.orderInfo.orderTime}}
                </div>
            </div>
        </div>
        <div class="module pdtb">
            <div class="brief right">实付金额：
                <div class="money">{{info.orderInfo.payMoney}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                page: {
                    statusDic: {
                        register: {
                            1:'待支付',
                            2:'已取消',
                            3:'预约成功',
                            4:'已完成',
                            5:'已退号',
                            6:'退款中',
                            7:'已退款',
                        },
                    },
                    cfgDic: {
                        1: '可取消订单',
                        2: '不可退当天号源',
                        3: '不可退3天内号源',
                    }
                },
                info: {},
                data: {},
                params: {},

            }
        },
        created() {
             this.params = peace.util.decode(this.$route.params.json)
             this.getData();
        },
        methods: {
            getData(){
                peace.service.patient.getOrderDetail({
                    orderNo: this.params.orderInfo.orderNo,
                    orderType: this.params.orderInfo.orderType,
                }).then(res => {
                    this.info = res.data || {}
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

    .form-dl{
        border-bottom: 1px solid #f5f5f5;
        .form-dt{
            font-size: 14px;
        }
        .form-dd{
            font-size: 14px;
        }
    }
    .order{
        padding-bottom: 5px;
    }

</style>