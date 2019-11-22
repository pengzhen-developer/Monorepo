<template>
  <div class="userorderList"
       style="height: 100%;">
    <div class="content"
         style="min-height: 100%;">
      <div v-if="$store.getters['appointMent/appointList'].length">
        <div class="panel"
             v-for="(item,index) in $store.getters['appointMent/appointList']"
             :key="index">
          <!-- 咨询订单 -->
          <div v-if="item.orderType=='inquiry'">
            <div class="panel-body"
                 @click="goConsultDetailPage(item)">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                     :src="item.doctorInfo.avartor" />
                <div class="card-body">
                  <div class="card-name card-flex">{{item.doctorInfo.name}}
                    {{item.doctorInfo.deptName}}
                    <div class="card-gary">[图文咨询]</div>
                  </div>
                </div>
                <div :class="['strip-eye','color-' + item.orderType + '-' +item.inquiryInfo.inquiryStatus]"
                     v-if="item.inquiryInfo&&item.inquiryInfo.inquiryStatus">
                  {{page.orderTypeMap[item.orderType][item.inquiryInfo.inquiryStatus]}}
                </div>
              </div>
              <div class="small">
                <div class="small-item">
                  <div class="small-item-key">就/复诊人:</div>
                  <div class="small-item-val"
                       v-if="item.familyInfo">{{item.familyInfo.familyName}}
                    {{item.familyInfo.familySex}}
                    {{item.familyInfo.familyAge}}岁</div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">订单金额:</div>
                  <div class="small-item-val"
                       v-if="item.orderInfo"
                       :class="['small-price',item.orderInfo.orderMoney == 0 ? 'default' : 'money']">
                    {{item.orderInfo.orderMoney == 0 ? '免费' : '￥'+ item.orderInfo.orderMoney }}
                    <span style="color:#999;font-size:13px;"
                          v-if="item.inquiryInfo.inquiryStatus=='4'&&item.orderInfo.payMoney>0">{{'(已退款'+item.orderInfo.payMoney+')'}}</span>
                  </div>

                </div>
                <div class="small-item">
                  <div class="small-item-key">下单时间:</div>
                  <div class="small-item-val">{{item.orderInfo.orderTime}}</div>
                </div>
              </div>
            </div>
            <!-- <div class="panel-bottom " v-if="item.inquiryInfo.inquiryStatus=='1'">
              <div class="time">订单关闭倒计时：14:39</div>
              <div class="label gary" @click="showCancellPop(item)">取消订单</div>
              <div class="label blue" @click="goPay(item)">继续支付</div>
            </div>
            <div class="panel-bottom " v-if="item.inquiryInfo.inquiryStatus=='2'">
              <div class="time">医生接诊倒计时：14:39</div>
              <div class="label gary" @click="cancelOrder(item)">取消订单</div>
            </div> -->
            <div class="panel-bottom"
                 style="padding-left: 0"
                 v-if="item.inquiryInfo.inquiryStatus === 1 || item.inquiryInfo.inquiryStatus === 2">
              <div class="count-down">
                <span>{{item.inquiryInfo.inquiryStatus ==1 ? '订单关闭倒计时：': '医生接诊倒计时：'}}</span>
                <van-count-down millisecond
                                :time="item.time"
                                format="HH:mm:ss" />
              </div>
              <div class="label gary"
                   @click="showCancellPop(item)">取消订单</div>
              <div class="label blue"
                   v-if="item.inquiryInfo.inquiryStatus === 1"
                   @click="goPay(item)">继续支付</div>
            </div>
          </div>
          <!-- 预约挂号 -->
          <div v-if="item.orderType=='register'">
            <div class="panel-body"
                 @click="goOrderDetailPage(item)">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                     :src="item.doctorInfo.avartor" />
                <div class="card-body">
                  <div class="card-name card-flex">{{item.doctorInfo.name}}
                    {{item.doctorInfo.deptName}}
                    <div class="card-gary">[预约挂号]</div>
                  </div>
                </div>
                <div :class="['strip-eye','color-' + item.orderType + '-' +item.orderStatus]">
                  {{page.orderTypeMap[item.orderType][item.orderStatus]}}
                </div>
              </div>
              <div class="small">
                <div class="small-item">
                  <div class="small-item-key">就诊人:</div>
                  <div class="small-item-val">
                    {{item.familyInfo&&item.familyInfo.name||item.familyName}}
                    {{item.familyInfo&&item.familyInfo.sex||''}}
                    {{item.familyInfo&&item.familyInfo.age+'岁'||''}}</div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">订单金额:</div>
                  <div class="small-item-val"
                       :class="['small-price',item.orderMoney == 0 ? 'default' : 'money']">
                    {{item.orderMoney == 0 ? '免费' : '￥'+ item.orderMoney }}
                  </div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">预约就诊时间:</div>
                  <div class="small-item-val">{{item.bookDate}}</div>
                </div>
              </div>
            </div>
            <div class="panel-bottom "
                 v-if="item.orderStatus == '1'||item.orderStatus == '3'">
              <div class="count-down"
                   v-if="item.orderStatus == '1'">
                <span>订单关闭倒计时:</span>
                <van-count-down millisecond
                                :time="item.time"
                                format="HH:mm:ss" />
              </div>
              <div class="label gary"
                   @click="canselOrder(item)"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '1'">取消订单
              </div>
              <div class="label blue"
                   @click="goPay(item)"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '1'">继续支付</div>
              <div class="label blue"
                   @click="canselOrder(item)"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '3' && item.cancelState">申请退号</div>
            </div>
          </div>
          <!-- 检查单 -->
          <!-- <div v-if="item.orderType=='insperction'">
            <div class="panel-body" @click="goOrderDetailPage(item)">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                  src="/src/assets/images/ic_video_open.png" />
                <div class="card-body">
                  <div class="card-name card-flex">张豆豆 儿科
                    <div class="card-gary">[检查单]</div>
                  </div>
                </div>
                <div>待支付</div>
              </div>
              <div class="small">
                <div class="small-item">
                  <div class="small-item-key">就/复诊人:</div>
                  <div class="small-item-val">哈哈 男 25岁</div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">订单金额:</div>
                  <div class="small-item-val">￥120.00 ||免费
                  </div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">检查项目:</div>
                  <div class="small-item-val">
                    <div>胸部正侧位 x1</div>
                    <div>胸部正侧位 x1</div>
                  </div>
                </div>
              </div>
              <div class="panel-bottom ">
                <div class="time">订单关闭倒计时：14:39</div>
                <div class="label gary" @click="cancelOrder(item)">取消订单</div>
                <div class="label blue" @click="goPay(item)">继续支付</div>
              </div>
            </div>
          </div> -->
          <!-- 私人医生 -->
          <!-- <div v-if="item.orderType == 'privateDoctor'">
            <div class="panel-body" @click="goOrderDetailPage(item)">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                  src="/src/assets/images/ic_video_open.png" />
                <div class="card-body">
                  <div class="card-name card-flex">张豆豆 儿科
                    <div class="card-gary">[私人医生]</div>
                  </div>
                </div>
                <div>待支付</div>
              </div>
              <div class="small">
                <div class="small-item">
                  <div class="small-item-key">就/复诊人:</div>
                  <div class="small-item-val">哈哈 男 25岁</div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">订单金额:</div>
                  <div class="small-item-val">￥120.00 <span style="color:#999;">(已退款120.00)</span>
                  </div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">下单时间:</div>
                  <div class="small-item-val">2019/11/12 12:11</div>
                </div>
              </div>
            </div> -->
        </div>
      </div>
      <div class="none-page"
           v-if="$store.getters['appointMent/appointList'] ==0 && $store.getters['appointMent/loaded']">
        <div class="icon icon_none_consult"></div>
        <div class="none-text">暂无订单记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)
export default {
  props: {},
  data() {
    return {
      loaded: false,
      page: {
        isGet: false,
        none: true,
        json: {},
        orderTypeMap: {
          register: {
            1: '待支付',
            2: '已取消',
            3: '预约成功',
            4: '已完成',
            5: '已退号',
            6: '退款中',
            7: '已退款'
          },
          inquiry: {
            1: '待支付',
            2: '待接诊',
            3: '已接诊',
            4: '已退诊',
            5: '已完成',
            6: '已取消'
          },
          privateDoctor: {
            0: '待支付',
            1: '待接单',
            2: '已取消',
            3: '已生效',
            4: '已退单',
            5: '退款中',
            6: '已退款',
            7: '已完成'
          }
        }
      },
      data: {},
      orderList: []
    }
  },
  activated() {
    this.$store.dispatch('appointMent/getList')
  },
  created() {
    // this.getData()
  },
  methods: {
    goPay(data) {
      let typeName = '',
        orderNo = '',
        money = '',
        json = {}
      let doctorId = data.doctorInfo.doctorId
      let doctorName = data.doctorInfo.name
      if (data.orderType == 'register') {
        orderNo = data.orderNo
        typeName = '预约挂号'
        money = data.orderMoney
        json = { money, typeName, doctorName, orderNo, doctorId }
      } else if (data.orderType == 'inquiry') {
        orderNo = data.orderInfo.orderNo
        typeName = '图文问诊 '
        money = data.orderInfo.orderMoney
        let inquiryId = data.inquiryInfo.inquiryId
        json = { money, typeName, doctorName, orderNo, doctorId, inquiryId }
      }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },
    getData() {
      this.orderList = []
      peace.service.patient.getOrderList({}).then(res => {
        this.orderList = res.data.list || []
        this.loaded = true
      })
    },
    showCancellPop(item) {
      let orderNo = ''
      if (item.orderType == 'register') {
        orderNo = item.orderNo
      } else if (item.orderType == 'inquiry') {
        orderNo = item.orderInfo.orderNo
      }
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          const params = {
            orderNo: orderNo
          }
          peace.service.patient.cancel(params).then(res => {
            peace.util.alert(res.msg)
            this.$store.dispatch('appointMent/getList')
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    canselOrder(item) {
      if (!item.cancelState && item.orderStatus != 1) {
        return
      }
      let type, alertMsg
      if (item.orderStatus == 1) {
        type = 'cancel'
        alertMsg = '是否确认取消'
      } else {
        type = 'quit'
        alertMsg = '是否确认退号'
      }
      Dialog.confirm({
        message: alertMsg
      })
        .then(() => {
          peace.service.appoint
            .orderCancel({
              orderNo: item.orderNo,
              type
            })
            .then(res => {
              peace.util.alert(res.msg || '退号成功')
              this.$store.dispatch('appointMent/getList')
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    goConsultDetailPage(item) {
      let json = peace.util.encode({
        inquiryId: item.inquiryInfo.inquiryId
      })
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },
    goOrderDetailPage(item) {
      // console.log(item);
      // return;
      let json = peace.util.encode({
        orderInfo: item
      })
      this.$router.push(`/setting/order/userOrderDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel .panel-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .count-down {
    // padding-left: 13px;
    font-size: 13px;
    display: flex;
    span {
      margin-right: 5px;
    }
  }
}
.content {
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  .panel {
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1px 15px;
    border-bottom: 0;
    margin-bottom: 15px;
    .panel-body {
      padding-top: 0;
    }
    .card {
      align-items: center;
      .card-name {
        font-size: 15px;
      }
      .card-gary {
        margin-left: 5px;
      }
    }
    .small {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      .small-item {
        display: flex;
        align-items: center;
        font-size: 13px;
        padding: 2px 0;
        .small-price {
          text-align: left;
          font-size: 13px;
        }
        .small-item-key {
          color: #999;
          margin-right: 10px;
        }
        .small-item-val {
          flex: 1;
          color: #333;
        }
      }
    }
    .panel-bottom {
      border-top: 1px solid #e8e8e8;
    }
  }
}

.card-gary {
  color: #999;
  font-size: 11px;
  font-weight: 400;
}
.card-avatar.card-img {
  width: 28px;
  height: 28px;
  margin-right: 5px;
}
.card-flex {
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: 5px;
}
.userConsultList {
  height: 100%;
}
.none-page {
  /*background-color: #fff;*/
}

.box {
  margin: 0;
  padding: (20px/2) (30px/2);
}
.box-tab {
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
.box-tab .tab-item {
  flex: 1;
  text-align: center;
  position: relative;
  border-left: (2px/2) solid #f5f5f5;
}
.box-tab .tab-item:first-child {
  border-left: none;
}
.box-tab .tab-item .span {
  /*display: inline-block;*/
  text-align: center;
  color: #333;
  font-size: (30px/2);
  padding-left: (50px/2);
}
.box-tab .tab-item .span.red::after {
  content: '';
  width: (15px/2);
  height: (15px/2);
  position: absolute;
  background: #f2223b;
  border-radius: 50%;
  top: -(8px/2);
  left: (0px/2);
}
.icon-referral::before {
  content: '';
  position: absolute;
  width: (50px/2);
  height: (50px/2);
  background-size: cover;
  display: block;
  left: -(40px/2);
  top: -(5px/2);
  background-image: url('../../../assets/images/icon-referral.jpg');
}
.icon-consultGroup::before {
  content: '';
  position: absolute;
  width: (50px/2);
  height: (50px/2);
  background-size: cover;
  display: block;
  left: -(40px/2);
  top: -(5px/2);
  background-image: url('../../../assets/images/icon-consultGroup.jpg');
}
.bottom {
  color: #999;
  text-align: center;
  font-size: (26px/2);
  box-sizing: border-box;
  padding-bottom: (30px/2);
}
.panel {
  padding: 0;
  box-shadow: none;
  border-bottom: 10px solid #f5f5f5;
}
.content .panel:first-child {
  margin-top: 0;
}
.panel .panel-head,
.panel .panel-body,
.panel .panel-bottom {
  // padding: (20px/2) (30px/2);
  padding: (20px/2) 0;
}
.panel .panel-bottom {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.panel .panel-bottom .time {
  flex: 1 0 auto;
  width: (280px/2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-strip {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  font-size: (30px/2);
  align-items: center;
  padding-top: 10px;
}
.card-strip .avatar {
  box-sizing: border-box;
  flex: 0 0 (60px/2);
  height: (60px/2);
  margin-right: (20px/2);
  border: 0;
  background: #fff;
}
.card-strip .avatar image {
  padding: (2px/2);
  border-radius: 50%;
  width: (54px/2);
  height: (54px/2);
  margin-top: -(1px/2);
  margin-left: -(1px/2);
  border: 1px solid #f3f3f3;
}

.strip-info {
  flex: 1;
  color: #000;
}
.strip-eye {
  flex: 0 0 auto;
  color: #999;
  text-align: right;
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
.strip-eye.color-a2 {
  color: #fb2828;
}

/*blue*/
.strip-eye.color-3,
.strip-eye.color-01,
.strip-eye.color-03,
.strip-eye.color-04,
.strip-eye.color-a3 {
  color: #00c6ae;
}
/**/
.code {
  display: block;
  font-size: (26px/2);
  padding: (12px/2) (18px/2);
  background-color: #fafafa;
  border: (2px/2) solid #f3f3f3;
  color: #000;
}

/**/
.small {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-top: (20px/2);
  color: #999;
  font-size: (24px/2);
  align-items: flex-end;
}
.small .small-time {
  flex: 0 0 auto;
  width: (250px/2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-type {
  flex: 0 0 auto;
  width: (100px/2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small .small-price {
  flex: 1;
  width: (120px/2);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.label {
  font-size: 12px;
  // padding: 5px (24px/2);
  margin-left: (20px/2);
  border-radius: (40px/2);
}
.label.gary {
  color: #999;
  border-color: #ccc;
}
.label.blue {
  background: #00c6ae;
  border-color: transparent;
  color: #fff;
}
.label.label-private {
  font-size: (16px/2);
  padding: (2px/2) (4px/2);
  border-radius: (5px/2);
  color: #f7e9b3;
  background: #504c4f;
  border-color: #504c4f;
  vertical-align: text-top;
  margin-top: (5px/2);
}
.panel .panel-head {
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
        *咨询订单状态
        inquiry: {
            1: '待支付',
            2: '待接诊',
            3: '已接诊',
            4: '已退诊',
            5: '已完成',
            6: '已取消'
          },
        *检查单状态
    */
/*red*/
.strip-eye.color-inquiry-1,
.strip-eye.color-inquiry-2,
.strip-eye.color-privateDoctor-0,
.strip-eye.color-privateDoctor-5,
.strip-eye.color-privateDoctor-1,
.strip-eye.color-register-1,
.strip-eye.color-register-6,
.money {
  color: #f2223b;
}
/*blue*/
.strip-eye.color-inquiry-3,
.strip-eye.color-privateDoctor-3,
.strip-eye.color-register-3 {
  color: #00c6ae;
}
/*default*/
.strip-eye.color-inquiry-4,
.strip-eye.color-inquiry-5,
.strip-eye.color-inquiry-6,
.strip-eye.color-privateDoctor-7,
.strip-eye.color-privateDoctor-6,
.strip-eye.color-privateDoctor-4,
.strip-eye.color-privateDoctor-2,
.strip-eye.color-register-2,
.strip-eye.color-register-4,
.strip-eye.color-register-5,
.strip-eye.color-register-7 {
  // color: #999;
  color: #666;
}
.small {
  padding-top: 0;
  font-size: (26px/2);
}
.small .small-time {
  flex: 1;
  font-size: (26px/2);
}
.small .small-price {
  flex: 0 0 auto;
  width: (200px/2);
  font-size: (30px/2);
}
.panel-bottom .time {
  font-size: (26px/2);
}
.small .money {
  /*font-size: (30px/2);*/
}
.label-jq {
  position: relative;
  background: #504c4f;
  padding: 1px (8px/2);
  color: #f7e9b3;
  display: inline-block;
  margin-left: -(30px/2);
  height: (40px/2);
  box-sizing: border-box;
  z-index: 3;
  padding-right: (13px/2);
  font-size: (24px/2);
}
.label-jq::after {
  content: '';
  position: absolute;
  right: -(20px/2);
  top: (0px/2);
  width: 0;
  height: 0;
  border-right: (20px/2) solid transparent;
  border-left: (20px/2) solid transparent;
  border-top: (20px/2) solid #504c4f;
  border-bottom: (20px/2) solid #504c4f;
  z-index: 0;
}
.label-jq.label-jq-register {
  background: #4f82f5;
  color: #fff;
}
.label-jq.label-jq-register::after {
  content: '';
  border-top-color: #4f82f5;
  border-bottom-color: #4f82f5;
}
.card .card-avatar {
  margin-left: 0;
}
.panel {
  margin-bottom: 0;
  border-bottom: (20px/2) solid #f5f5f5;
}
</style>
