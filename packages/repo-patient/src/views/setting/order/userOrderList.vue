<template>
  <div class="userorderList"
       style="height:100%;">
    <van-list :loading="loading"
              v-model="loading"
              :finished="finish"
              @load="get"
              class="content"
              :class="orderList.length>0&&'min'">

      <div v-if="orderList.length">
        <template v-for="(item,index) in orderList">
          <!-- 咨询订单 -->
          <div class="panel"
               :key="index"
               v-if="item.orderType=='inquiry'">
            <div class="panel-body"
                 @click="goConsultDetailPage(item,index,'countDown_inquiry_')">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                     :src="item.doctorInfo.avartor" />
                <div class="card-body">
                  <div class="card-name card-flex"><span>{{item.doctorInfo.name}}</span>
                    <span>{{item.doctorInfo.deptName}}</span>
                    <div class="card-gary">[{{item.inquiryType}}]
                    </div>
                  </div>
                </div>
                <div :class="['strip-eye','color-' + item.orderType + '-' +item.inquiryInfo.inquiryStatus]"
                     :style="{'color':item.heightLight&&'#00c6ae'}"
                     v-if="item.inquiryInfo&&item.inquiryInfo.inquiryStatus">
                  {{item.inquiryInfo.statusTxt}}
                </div>
              </div>
              <div class="small">
                <div class="small-item">
                  <div class="small-item-key">就诊人:</div>
                  <div class="small-item-val"
                       v-if="item.familyInfo">{{item.familyInfo.familyName}}
                    {{item.familyInfo.familySex}}
                    {{item.familyInfo.familyAge}}岁</div>
                </div>
                <div class="small-item">
                  <div class="small-item-key">订单金额:</div>
                  <div class="small-item-val"
                       :class="item.orderInfo.totalMoney==0||item.orderInfo.totalMoney == null?'price-free':'price'"
                       v-if="item.orderInfo">
                    {{item.orderInfo.totalMoney == 0||item.orderInfo.totalMoney == null ? '免费' : '￥'+ item.orderInfo.totalMoney }}
                    <span v-if="item.orderInfo.refundTime">{{'（已退款￥'+item.orderInfo.payMoney+'）'}}</span>
                  </div>
                </div>
                <div class="small-item"
                     v-if="item.inquiryInfo.serviceType=='returnVisit'">
                  <div class="small-item-key">复诊时间:</div>
                  <div class="small-item-val">{{item.inquiryInfo.appointmentTime}}</div>
                </div>
                <div class="small-item"
                     v-else>
                  <div class="small-item-key">下单时间:</div>
                  <div class="small-item-val">{{item.orderInfo.orderTime.replace(/-/g,'/')}}</div>
                </div>
              </div>
            </div>
            <div class="panel-bottom"
                 style="padding-left: 0"
                 v-if="item.close&&OrderCloseCountDown(item)||OrderReceptCountDown(item) ">
              <div class="count-down">
                <template v-if="OrderCloseCountDown(item)">
                  <span>订单关闭倒计时：</span>
                  <van-count-down millisecond
                                  @finish="finishHander(item,index)"
                                  :ref="'countDown_inquiry_' + index"
                                  :time="item.time"
                                  format="mm:ss" />
                </template>
                <template v-if="OrderReceptCountDown(item)">
                  <span>医生接诊倒计时：</span>
                  <van-count-down millisecond
                                  @finish="finishHander(item,index)"
                                  :time="item.time"
                                  format="HH:mm:ss" />
                </template>
              </div>
              <!-- <div class="label gary"
                   @click="showCancellPop(item,index)">取消订单</div> -->
              <div class="label blue"
                   v-if="item.inquiryInfo.inquiryStatus === 1&&(item.inquiryInfo.appointmentStatus =='0'||(item.inquiryInfo.reportTime&&item.inquiryInfo.appointmentStatus =='1'))"
                   @click="goPay(item,index,'countDown_inquiry_')">继续支付</div>
            </div>
          </div>

          <!-- 预约挂号 -->
          <div class="panel"
               :key="index"
               v-if="item.orderType=='register'">
            <div class="panel-body"
                 @click="goOrderDetailPage(item,index,'countDown_register_')">
              <div class="card ">
                <img class="card-avatar avatar-circular card-img"
                     :src="item.doctorInfo.avartor" />
                <div class="card-body">
                  <div class="card-name card-flex"><span>{{item.doctorInfo.name}}</span>
                    <span>{{item.doctorInfo.deptName}}</span>
                    <div class="card-gary">[{{item.inquiryType}}]</div>
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
                       :class="item.totalMoney==0||item.totalMoney == null?'price-free':'price'">
                    {{item.totalMoney == 0||item.totalMoney == null ? '免费' : '￥'+ item.totalMoney }}
                  </div>
                </div>
                <div class="small-item">
                  <div class="small-item-key time">预约就诊时间:</div>
                  <div class="small-item-val">{{item.bookDate}}</div>
                </div>
              </div>
            </div>
            <div class="panel-bottom "
                 v-if="(item.orderStatus == '1'&&item.close)||(item.orderStatus == '3'&& item.cancelState)">
              <div class="count-down"
                   v-if="item.orderStatus == '1'&&item.close">
                <span>订单关闭倒计时:</span>
                <van-count-down millisecond
                                @finish="finishHander(item,index)"
                                :ref="'countDown_register_'+index"
                                :time="item.time"
                                format="HH:mm:ss" />
              </div>
              <div class="count-down"
                   v-if="item.orderStatus == '3'"></div>
              <!-- <div class="label gary"
                   @click="canselOrder(item,index)"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '1'&&item.close">取消订单
              </div> -->
              <div class="label blue"
                   @click="goPay(item,index,'countDown_register_')"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '1'&&item.close">继续支付</div>
              <!-- <div class="label blue"
                   @click="canselOrder(item,index)"
                   data-orderid="item.orderId"
                   v-if="item.orderStatus == '3' && item.cancelState">申请退号</div> -->
            </div>
          </div>
        </template>
      </div>
    </van-list>
    <div class="none-page"
         v-if="orderList.length ==0 && loaded">
      <div class="icon icon_none_consult"></div>
      <div class="none-text">暂无订单记录</div>
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
      orderList: [],
      p: 0,
      size: 10,
      loaded: false,
      finish: false,
      loading: false,
      timer: null
    }
  },
  activated() {
    this.p = 0
    this.loaded = false
    this.orderList = []
    this.get()
  },

  methods: {
    OrderCloseCountDown(item) {
      return (
        item.inquiryInfo.inquiryStatus == 1 &&
        (item.inquiryInfo.appointmentStatus == '0' || (item.inquiryInfo.reportTime && item.inquiryInfo.appointmentStatus == '1'))
      )
    },
    OrderReceptCountDown(item) {
      return item.inquiryInfo.inquiryStatus == 2
    },
    finishHander(item, index) {
      if (item.orderType == 'inquiry') {
        //待支付倒计时结束自动取消，待接诊倒计时结束不处理
        if (
          item.inquiryInfo.inquiryStatus == 1 &&
          (item.inquiryInfo.appointmentStatus == 0 || (item.inquiryInfo.reportTime && item.inquiryInfo.appointmentStatus == 1))
        ) {
          item.close = false
          item.inquiryInfo.inquiryStatus = 6
          let orderNo = item.orderInfo.orderNo
          this.cancelInquiryOrder(orderNo, index, 'auto')
          item.inquiryInfo.statusTxt = item.inquiryInfo.appointmentStatus == 1 ? item.inquiryInfo.statusTxt : '已取消'
        }
      } else if (item.orderType == 'register') {
        item.close = false
        let orderNo = item.orderNo
        if (!item.cancelState && item.orderStatus != 1) {
          return
        }
        let type = ''
        if (item.orderStatus == 1) {
          type = 'cancel'
        } else {
          type = 'quit'
        }
        this.cancelRegisterOrder(orderNo, index, type, 'auto')
        item.orderStatus = 2
      }
      let data = JSON.parse(JSON.stringify(item))
      this.orderList.splice(index, 1, data)
    },
    goPay(data, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }
      let typeName = '',
        orderNo = '',
        money = '',
        orderType = '',
        json = {}
      let doctorId = data.doctorInfo.doctorId
      let doctorName = data.doctorInfo.name
      orderType = data.orderType
      typeName = data.inquiryType
      if (data.orderType == 'register') {
        orderNo = data.orderNo
        money = data.orderMoney
        json = { money, typeName, doctorName, orderNo, doctorId, orderType }
      } else if (data.orderType == 'inquiry') {
        orderNo = data.orderInfo.orderNo
        money = data.orderInfo.orderMoney
        let inquiryId = data.inquiryInfo.inquiryId
        json = { money, typeName, doctorName, orderNo, doctorId, inquiryId, orderType }
      }
      json = peace.util.encode(json)

      // this.$router.push(`/components/doctorInquiryPay/${json}`)
      this.$router.push(`/components/ExpenseDetail/${json}`)
    },
    get() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.getData()
          this.timer = null
        }, 500)
      }
    },
    getData() {
      this.p++
      peace.service.patient.getOrderList({ p: this.p, size: this.size }).then((res) => {
        if (res.data.list.length > 0) {
          res.data.list.map((item) => {
            item.close = true

            if (item.orderType == 'register') {
              if (item.orderExpireTime > item.currentTime) {
                item.time = (item.orderExpireTime - item.currentTime) * 1000
              }
              item.inquiryType = '预约挂号'
            } else if (item.orderType == 'inquiry') {
              let inquiryInfo = item.inquiryInfo
              let expireTime = inquiryInfo.inquiryStatus == 1 ? inquiryInfo.orderExpireTime : inquiryInfo.orderReceptTime
              if (expireTime > inquiryInfo.currentTime) {
                item.time = (expireTime - inquiryInfo.currentTime) * 1000
              }
              item.heightLight = false
              if (item.inquiryInfo.serviceType == 'returnVisit') {
                item.inquiryType = '复诊预约'
                /** 预约成功-- #00c6ae */
                if (item.inquiryInfo.inquiryStatus == '1' && item.inquiryInfo.appointmentStatus == '1' && !item.inquiryInfo.reportTime) {
                  item.heightLight = true
                }
              } else {
                item.inquiryType = item.orderInfo.inquiryType == 'image' ? '图文咨询' : '视频咨询'
              }
            }
          })
        }
        this.orderList = this.orderList.concat(res.data.list)
        this.loaded = true
        this.loading = false
        if (this.p * this.size >= res.data.total) {
          this.finish = true
        }
      })
    },
    showCancellPop(item, index) {
      let orderNo = item.orderInfo.orderNo
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          this.cancelInquiryOrder(orderNo, index, 'hand')
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelInquiryOrder(orderNo, index, type) {
      let params = {
        orderNo: orderNo
      }
      if (type == 'auto') {
        params.cancelType = 2
      }
      peace.service.patient
        .cancel(params)
        .then((res) => {
          if (type == 'hand') {
            peace.util.alert(res.msg)
            if (res.code == '200') {
              let data = this.orderList[index]
              data.inquiryInfo.inquiryStatus = '6'
              this.orderList.splice(index, 1, data)
            }
          }
        })
        .catch(() => {
          let data = this.orderList[index]
          this.orderList.splice(index, 1, data)
        })
    },
    canselOrder(item, index) {
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
          this.cancelRegisterOrder(item.orderNo, index, type, 'hand')
        })
        .catch(() => {
          // on cancel
        })
    },
    cancelRegisterOrder(orderNo, index, type, hasAlert) {
      let params = {
        orderNo: orderNo,
        type: type
      }
      if (hasAlert == 'auto') {
        params.cancelType = 2
      }
      peace.service.appoint
        .orderCancel(params)
        .then((res) => {
          if (hasAlert == 'hand') {
            peace.util.alert(res.msg || '退号成功')
            if (res.code == '200') {
              let data = this.orderList[index]
              if (data.orderStatus == '1') {
                data.orderStatus = '2'
              } else {
                data.orderStatus = '6'
              }
              this.orderList.splice(index, 1, data)
            }
          }
        })
        .catch(() => {
          let data = this.orderList[index]
          this.orderList.splice(index, 1, data)
        })
    },
    goConsultDetailPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }

      let json = peace.util.encode({
        inquiryId: item.inquiryInfo.inquiryId
      })
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },
    goOrderDetailPage(item, index, type) {
      if (this.$refs[type + index] && this.$refs[type + index].length > 0) {
        const countDown = this.$refs[type + index][0]
        countDown.pause()
      }
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
  .label {
    margin-left: 0;
  }
  .count-down {
    display: flex;
    margin-right: 5%;
    .van-count-down {
      color: #999;
    }
    span {
      font-size: 13px;
    }
  }
}
.content {
  box-sizing: border-box;
  background-color: #f9f9f9;
  &.min {
    min-height: 100%;
    padding: 10px;
  }

  .panel {
    background: #fff;
    box-sizing: border-box;
    border-radius: 7px;
    padding: 1px 15px;
    border-bottom: 0;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .panel-body {
      padding-top: 12px;
    }
    .card {
      align-items: center;
      margin-top: 0;
      .card-name {
        font-size: 15px;
        span {
          margin-right: 7px;
        }
      }
    }
    .card .card-avatar.avatar-circular,
    .avatar-circular {
      margin: 0;
      margin-right: 13px;
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
          margin-right: 13px;
          // width: 65px;
          width: 5em;
          text-align: justify;
          text-align-last: justify;
          height: 20px;
          line-height: 20px;
          &.time {
            // width: 85px;
            width: 7em;
          }
          &::after {
            content: ' ';
            display: inline-block;
            width: 100%;
            height: 0px;
          }
        }
        .small-item-val {
          height: 20px;
          line-height: 20px;
          flex: 1;
          color: #333;
          display: flex;
          align-items: center;
          &.price-free {
            color: #00c6ae;
          }
          &.price {
            color: #f2223b;
          }
          span {
            color: #999;
            font-size: 13px;
            margin-left: 3px;
          }
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

.box {
  margin: 0;
  padding: (20px/2) (30px/2);
}
.box-tab {
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

.content .panel:first-child {
  margin-top: 0;
}
.panel .panel-head,
.panel .panel-body,
.panel .panel-bottom {
  padding: (20px/2) 0;
}
.panel .panel-bottom {
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
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 27px;
  margin-left: 10px;
  border-radius: 20px;
}
.label.gary {
  color: #999;
  border-color: #ccc;
  margin-left: 0;
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
  padding: 0 15px;
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
</style>
