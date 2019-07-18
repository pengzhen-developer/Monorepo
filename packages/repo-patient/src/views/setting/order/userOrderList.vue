<template>
    <div class="userorderList">
        <div class="content">
            <div  v-if="orderList.length">
                <div class="panel" v-for="(item,index) in orderList" :key="index" >
                    <div class="panel-head">
                        <div class="card-strip">
                            <div class="strip-info" v-if="item.orderType == 'register'"><div class="label-jq label-jq-register">预约挂号</div></div>
                            <div class="strip-info"  v-if="item.orderType == 'privateDoctor'"><div class="label-jq">私人医生</div></div>
                            <div :class="['strip-eye','color-' + item.orderType + '-' +item.orderStatus]">{{page.orderTypeMap[item.orderType][item.orderStatus]}}</div>
                        </div>
                    </div>
                    <div class="panel-body" @click="goOrderDetailPage(item)" style="padding-top: 0">
                        <div class="card">
                            <img class="card-avatar avatar-circular" :src="item.doctorInfo.avartor"/>
                            <div class="card-body">
                                <div class="card-name">{{item.doctorInfo.name}}
                                    <div class="card-small">{{item.doctorInfo.doctorTitle}} {{item.doctorInfo.deptName}}</div>
                                </div>
                                <div class="card-brief">{{item.doctorInfo.hospitalName}}</div>
                            </div>
                        </div>
                        <div class="small" v-if="item.orderType=='privateDoctor'">
                            <div class="small-time">
                                {{item.orderStatus == 3 || item.orderStatus == 7 ? '有效期：' + item.startTime + '-' + item.endTime : ''}}
                            </div>
                            <div :class="['small-price',item.orderMoney == 0 ? 'default' : 'money']">{{item.orderMoney == 0 ? '免费' : '￥'+ item.orderMoney }}</div>
                        </div>
                        <div class="small" v-if="item.orderType=='register'">
                            <div class="small-time">
                                就诊人：张三
                            </div>
                        </div>
                        <div class="small" v-if="item.orderType=='register'">
                            <div class="small-time">
                                预约就诊时间：{{item.bookDate}}
                            </div>
                            <div :class="['small-price',item.orderMoney == 0 ? 'default' : 'money']">
                                {{item.orderMoney == 0 ? '免费' : '￥'+ item.orderMoney }}</div>

                        </div>
                    </div>
                    <!--                    这个版本不展示私人医生-->
<!--                    <div class="panel-bottom " v-if="item.orderType == 'privateDoctor'">-->
<!--                        &lt;!&ndash;<div class="time">咨询倒计时:{{item.inquiryInfo.inquiryCancelTime}}</div>&ndash;&gt;-->
<!--                        <div class="time">订单编号：{{item.orderNo}}</div>-->
<!--                        <div class="label blue" @click="goPay(item)"  data-orderid="item.orderId" v-if="item.orderStatus == '0'">继续支付</div>-->
<!--                        <div class="label blue" @click="canselOrder(item)"-->
<!--                             data-orderid="item.orderId" v-if="item.orderStatus == '0' || item.orderStatus == '1'">取消订单</div>-->
<!--                    </div>-->
                    <div class="panel-bottom " v-if="item.orderType == 'register'">
                        <div class="time">订单编号：{{item.orderNo}}</div>
                        <div class="label blue" @click="goPay(item)"  data-orderid="item.orderId" v-if="item.orderStatus == '1'">继续支付</div>
                        <div class="label blue" @click="canselOrder(item)"
                             data-orderid="item.orderId" v-if="item.orderStatus == '3'">申请退号</div>
                    </div>
                </div>
            </div>
            <div class="none-page" v-if="!orderList.length">
                <div class="icon icon_none_consult"></div>
                <div class="none-text">暂无订单记录</div>
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
                    isGet: false,
                    none: true,
                    json: {},
                    orderTypeMap:{
                        register: {
                            1:'待支付',
                            2:'已取消',
                            3:'预约成功',
                            4:'已完成',
                            5:'已退号',
                            6:'退款中',
                            7:'已退款',
                        },
                        privateDoctor:{
                            0:'待支付',
                            1:'待接单',
                            2:'已取消',
                            3:'已生效',
                            4:'已退单',
                            5:'退款中',
                            6:'已退款',
                            7:'已完成',
                        }
                    }

                },
                data: {},
                orderList:[],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            goPay(){},
            getData(){
                peace.service.patient.getOrderList({orderType:'register'}).then(res => {
                    this.orderList = res.data.list || [];
                })
            },
            canselOrder(item){
                if(!item.cancelState){
                    return;
                }
                peace.service.appoint.orderCancel({
                    orderNo: item.orderNo,
                }).then(res => {
                    peace.util.alert(res.msg || '取消成功')
                    this.getData();
                })
            },
            goOrderDetailPage(item){
                let json = peace.util.encode({
                    orderInfo:item
                })
                this.$router.push(`/setting/order/userOrderDetail/${json}`)
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";
    .userConsultList{
        height: 100%;
    }
    .none-page{
        /*background-color: #fff;*/
    }

    .box{
        margin: 0;
        padding: (20px/2) (30px/2);
    }
    .box-tab{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;

        background: #fff;
        box-shadow: 0 0 (10px/2) rgba(204, 204, 204, 0.5);
        padding: (30px/2) (20px/2);
        box-sizing: border-box;
        border-radius: (30px/2);
    }
    .box-tab .tab-item{
        flex: 1;
        text-align: center;
        position: relative;
        border-left: (2px/2) solid #f5f5f5;
    }
    .box-tab .tab-item:first-child{
        border-left: none;
    }
    .box-tab .tab-item .span{
        /*display: inline-block;*/
        text-align: center;
        color: #333;
        font-size: (30px/2);
        padding-left: (50px/2);
    }
    .box-tab .tab-item .span.red::after{
        content: '';
        width: (15px/2);
        height: (15px/2);
        position: absolute;
        background: #F2223B;
        border-radius: 50%;
        top: -(8px/2);
        left: (0px/2);
    }
    .icon-referral::before{
        content: '';
        position: absolute;
        width: (50px/2);
        height: (50px/2);
        background-size: cover;
        display: block;
        left: -(40px/2);
        top: -(5px/2);
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEVHcExnZ2dmZmZnZ2dmZmZmZmZmZmZnZ2dmZmZmZmZx2LtmZmZmZmZnZ2e18+JmZmZm6cg037Vqamoz37U04LY037Wz9OKy8+FB4blnZ2e29OK18+I04LYz37Y037W19ONmZmYz3rS08uGS7dZQ476l8Nxm5saB6s8k8yC4AAAAIHRSTlMAmeg5eKP99viBDc1rVuS0IdMatD7uO8iX/HmkVYJwYLpAgFoAAARcSURBVGjezZrtlrIgEIBNNzVc08zMj6z8vv87fFUUUDQQY887+6ezIU8zwwwDo6L8J6LZPyJia9wEcDJ0Q0x09QT4tFDNt7iYKo82mqm/90hksimeuo/xfuuqx4IczPdeMQ8sp0M9DPUoIoM3TYbz7X6Y+SO49E/wcZtjlG4JB5jVQ06fBx15BjF/5IEDYvwKQ36MboLj50HO1yGeRokD16D2QbwNEO1ovHVKYDh9lLfpaHwQ4OiReEzrjscB8ax9gW2upQ4SspPR6mIBFuT3CwnqhwVR4bg2RQnIG/5CA3yGaP0iMh1PKBQ850OCwhD4SQUSEhSGHCKOBMPMtUcGZGcW/O1ncv4OAoB0CLhmWSgZAi5ZK08pEK1zfNQ+f+0Y2UUKpMtKkekpYSYT4h2sNt0/IaNzCoiTGHwZ0os/MLKHAu55nt/FIeCZ+otfuLcR4iodI89fohC/mypdgl9Gxk1JekYeC0Ie42+lBDGyawwZopqkwzy0wa6IkYUDIwciEBBmBMQFy4ysGBhnEccDPJOvBK1vE0B/08qoSCIAcbHVMz84j56lGHVOuGQjxL9llNnvFL2VZoS4myGPyUQFYfU0m0pFumQTZDYThvhIjQv8VE5csgGCl1V4mUAe2BuXx8xar20Q7NjnsFZ7SNWUWLfrOCifuIQbghx7e4yBXVRFXZL2e47pESly35Tq0bK6tSH4KrMFufgoPSJF4i0QtKwurf5JvgC5pQDE9UyRwVp8kBQbXQFtdqUhoRskeZNNl9ZoLS4Icnm727ndLlHOtQji9t/NLG3lecANwXtEW4DATNJMMkgCd6dinlGQImzIZFkFw+OD8cu6GUMbgbGxkCJMyGRZxej5qqiqKieknicUQhEWBO3ZcFmtSVXSjNzlhaTTZbWCqLMFxou77gqRz937GqLJlhgJf3GHyqjwvIwosBZZSTDOYEMF+aT2ulGBqpilLnLEOdhU1T+W5mgWEkuzyuAIxseNskZBI+pqncGTVnyKUn9EUAyu3IWLhGGumbHqYuKtOxA6M2JKQUFmBLSHbD/O4b23ISA1kbqQGsGO029IUspZSsfeeCm7jtgpsZRXICuILSUREZZLkHMScNzcMYs7FJblHHJO4p7g7YdMK2Fc3AVg7H6w77s4amH3tlYLd2oYOvsqiqeqn9TuM4htrN4ybTyfkKeQGeSLt0QERR6ECEuZEBQwUiFjwFRSITBg6lwuRHHTEN0GSIN08voLyFB8o2pU0m3q5LJA2pWtm+TnmONeGDfOJF4+q2hqaRBwxL2C70AMixJz6HooX4N0PbTp3yDG6XuQ1YY87JlIhYw9NZkQ0xpqjC/5hH4PI9IttPN/B2LZlJAtW4nB+NeQaB+kz4K6w9NdE39HwdE5unvwbYtItLVv6zxvBgDYJY+sk4hYEUwgrH7r+AZMZAoIRJgOs11kRLu72OzGsRbtpEQ2TxfP2PV+lWlzLRHvEJmGLiKtV45MW/0DNvDTjYn1wpgAAAAASUVORK5CYII=);
    }
    .icon-consultGroup::before{
        content: '';
        position: absolute;
        width: (50px/2);
        height: (50px/2);
        background-size: cover;
        display: block;
        left: -(40px/2);
        top: -(5px/2);
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAh1BMVEVHcExnZ2dnZ2e08+FmZmZnZ2dnZ2dmZmZmZmZoaGi49eg037VnZ2dn2Lkz37U14La29OK09+VB07A14bc037WF5s629OMz37Ww9OM037U037Y84Li18+JmZmY04LVO4r608+G18+JnZ2e08+K18+JpaWm29OO18+JmZmYz3rS08uFg5cSG69HhhlNBAAAAKHRSTlMAzK6xf5C59vxTGLPSD5E+byAaKs8GW/YtdlfdweZo/up/bJjeL0NRsuxZXAAAA8BJREFUaN7tmut2ojAURlMQiWECCsYbYhW1ldj3f77JhUtAAnQkXbO6/H5YRHBz2ElAUgBe+YdcZ5PRM7uqBDxJoGsgtyQlBWPG3hoKTPJqUngzF+jORB0mGRzDasHuzTAkIcCREBcmbyMnucmvhinIFxw8frfAljSRAPHXdcz0PkuWICtxiRlIKFXISt5MDSSJhAiWZQry5wV5Qb4DCQ4/ANn5LyffOl1ovzAEKYfQ7RKfkFxFxoVgL4t3eSVesWq93o0K8bIsWwePq6IRIYeMp2i7iG7YpUKsivFokGgtvlGep8AXkECsWntjQXCcKRAm/owKSJYdRoKIsy8gvDkd8oLyleuIjAERQvjL8kKrHsIh/pK9vNP58xAhxMfi6yi9sONGl0UOEZ/d6cezECFkSQoI/Qy2pXgf7HiVX0f0JCTvDlgcMsucibdRAVncBWVPnoIIIaxjl5UwSOUELOi7+OD0DEQKYQuLEqKKZxCadWkZAsmFsCWbQ04SIkbhEvLVpWUIpByf5vyAlysOCQ6KeAahoqvSdi0DIIUQsBFnxVtJJ/VKqL3Ua+mHlELQpQapO6F2R2/phShCqAIhuAnp6C29EEWICmGF2fXTBYAvtXwfogqh9FxCol1DPINgnZYeSCkEMyF0H6riL81KgE5LN6Qu5LjAHeLFlb9dSzekLuQTVBActkFIu5ZOSEMIUCBs+YweIBotXZCGEKJCouBRPNBp6YCIo1KEABXCxB8XLZBWLR2QppAGpM2JRose8iCkBgkjDaRNixbyKAQ0xJ9QK6RFixbCjyeOwjAUQjahSKRUUokPea12WGbb1KKD4EyXUnx1B9mWu6JFW0ms23urisdr3WZftNKihew0u8c47yfqTXjLZry1fPS2rsj3PC++3+/vnpItBoX4OZJ33mwt2ypWt/IOZM9VoiFjV9VDlORjl3AiU29d+S+LI2+UAyCIM2zUyFwRr0Cam/Fjoat+yCfVhYtHpHYwrbH7IRvtzpuo9kPxotvuNMDJWbMvH2TICveWfMFDLr+rs/2YMzvTBCtOWM1t29lz/NzDgpp4U08kwohsiGnIDz3AIR/YPOQHnPy3z7vEY/Sp4cfockLAEANDFZKagcgZIChP1w3OTDDSYpImn62BieWMHCvJZ7IccM0n5+DoKWbOXNZ1J6anAIUJyygFTqSfCTQ3LQvLdnud3lwD5bgutNSJ7DB1rOnIsZwUg1deeWVorlPXbBIrBGw8MT0MJ8D0/2FUdyu/AAL5xcRw+CUlnBnObxrv/wKX0vRYNNKmOgAAAABJRU5ErkJggg==);
    }
    .bottom{
        color: #999;
        text-align: center;
        font-size: (26px/2);
        box-sizing: border-box;
        padding-bottom: (30px/2);
    }
    .panel{
        padding: 0;
        box-shadow: none;
        border-bottom: 10px solid #f5f5f5;
    }
    .content .panel:first-child{
        margin-top: 0;
    }
    .panel .panel-head,.panel .panel-body,.panel .panel-bottom{
        padding: (20px/2) (30px/2);
    }
    .panel .panel-bottom{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }
    .panel .panel-bottom .time{
        flex:1 0 auto;
        width: (280px/2);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

    }
    .card-strip{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        font-size: (30px/2);
        align-items:center;
    }
    .card-strip .avatar{
        box-sizing: border-box;
        flex: 0 0 (60px/2);
        height: (60px/2);
        margin-right: (20px/2);
        border: 0;
        background: #fff;
    }
    .card-strip .avatar image{
        padding: (2px/2);
        border-radius: 50%;
        width: (54px/2);
        height: (54px/2);
        margin-top: -(1px/2);
        margin-left: -(1px/2);
        border: 1px solid #f3f3f3;
    }

    .strip-info{
        flex: 1;
        color: #000;
    }
    .strip-eye{
        flex:0 0 auto;
        color:#999;
        text-align:right;
    }
    /* color-x: 咨询单状态，
     * color-0x 转诊单状态 ↓
     *  01:转出待审核  02:转出已拒绝 03:转出已通过/转入待审核 04:转入已通过 05:转入已拒绝 06:转诊完成 07:转诊已关闭
     * color-ax 购药单状态
     * 1: 待接单 2:已接单 3:已发货 4:已完成
    */
    /*red*/
    .strip-eye.color-1,
    .strip-eye.color-2,
    .strip-eye.color-02,
    .strip-eye.color-05,
    .strip-eye.color-a1,
    .strip-eye.color-a2{
        color: #FB2828;
    }
    /*blue*/
    .strip-eye.color-3,
    .strip-eye.color-01,
    .strip-eye.color-03,
    .strip-eye.color-04,
    .strip-eye.color-a3{
        color: #00C6AE;
    }
    /**/
    .code{
        display: block;
        font-size: (26px/2);
        padding: (12px/2) (18px/2);
        background-color: #FAFAFA;
        border: (2px/2) solid #F3F3F3;
        color: #000;
    }

    /**/
    .small{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        padding-top: (20px/2);
        color: #999;
        font-size: (24px/2);
        align-items:flex-end;
    }
    .small .small-time{
        flex:0 0 auto;
        width:(250px/2);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

    }
    .small .small-type{
        flex: 0 0 auto;
        width: (100px/2);
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .small .small-price{
        flex:1;
        width: (120px/2);
        text-align: right;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .label{
        font-size: 12px;
        padding: 2px (24px/2);
        margin-left: (20px/2);
        border-radius:(40px/2);
    }
    .label.label-private{
        font-size: (16px/2);
        padding: (2px/2) (4px/2);
        border-radius: (5px/2);
        color: #F7E9B3;
        background: #504C4F;
        border-color: #504C4F;
        vertical-align: text-top;
        margin-top: (5px/2);

    }
    .panel .panel-head{
        padding: 0 (30px/2);
    }
    /*
     *   * 挂号订单状态
        register: {
        1:'待支付',
        2:'已取消',
        3:'已付款',
        4:'已完成',
        5:'已退号',
        6:'退款中',
        7:'已退款',
        },
         * 私人医生订单状态
        privateDoctor:{
        0:'待支付',
        1:'待接单',
        2:'已取消',
        3:'已生效',
        4:'已退单',
        5:'退款中',
        6:'已退款',
        7:'已完成',
        }
    */
    /*red*/
    .strip-eye.color-privateDoctor-0,
    .strip-eye.color-privateDoctor-5,
    .strip-eye.color-privateDoctor-1,
    .strip-eye.color-register-1,
    .strip-eye.color-register-6,
    .money{
        color: #F2223B;
    }
    /*blue*/
    .strip-eye.color-privateDoctor-3,
    .strip-eye.color-register-3{
        color: #00C6AE;
    }
    /*default*/
    .strip-eye.color-privateDoctor-7,
    .strip-eye.color-privateDoctor-6,
    .strip-eye.color-privateDoctor-4,
    .strip-eye.color-privateDoctor-2,
    .strip-eye.color-register-2,
    .strip-eye.color-register-4,
    .strip-eye.color-register-5,
    .strip-eye.color-register-7{
        color: #999;
    }
    .small{
        padding-top: 0;
        font-size: (26px/2);
    }
    .small .small-time{
        flex: 1;
        font-size: (26px/2);
    }
    .small .small-price{
        flex: 0 0 auto;
        width: (200px/2);
        font-size: (30px/2);
    }
    .panel-bottom .time{
        font-size: (26px/2);
    }
    .small .money{
        /*font-size: (30px/2);*/
    }
    .label-jq{
        position: relative;
        background: #504C4F;
        padding: 1px (8px/2);
        color: #F7E9B3;
        display: inline-block;
        margin-left: -(30px/2);
        height: (40px/2);
        box-sizing: border-box;
        z-index: 3;
        padding-right: (13px/2);
        font-size: (24px/2);
    }
    .label-jq::after{
        content: '';
        position: absolute;
        right: -(20px/2);
        top: (0px/2);
        width:0;
        height:0;
        border-right:(20px/2) solid transparent;
        border-left:(20px/2) solid transparent;
        border-top:(20px/2) solid #504C4F;
        border-bottom:(20px/2) solid #504C4F;
        z-index: 0;
    }
    .label-jq.label-jq-register{
        background: #4F82F5;
        color: #fff;
    }
    .label-jq.label-jq-register::after{
        content: '';
        border-top-color: #4F82F5;
        border-bottom-color: #4F82F5;
    }
    .card .card-avatar{
        margin-left: 0;
    }
    .panel{
        margin-bottom: 0;
        border-bottom: (20px/2) solid #f5f5f5;
    }
</style>