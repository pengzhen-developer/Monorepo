<template>
  <div class="page"
       v-if="firstLoad">
    <div class="consult-detatil"
         :style="{'margin-bottom':payBottomHeight}">
      <div class="module top">
        <div class="top-title">
          {{ internalData.orderStatusTxt }}
          <div class='type-tag'>检验</div>
        </div>
        <div class="status-message">
          {{ orderStatusMessage }}
        </div>
      </div>

      <!--医生名片-->
      <div class="module"
           v-if="internalData.doctorInfo">
        <DoctorCard v-bind:doctorInfo="internalData.doctorInfo"></DoctorCard>
      </div>

      <!--订单内容-->
      <div class="module order">

        <div class="module-item"
             v-if="internalData.familyInfo">
          <div class="title">个人信息</div>
          <FamilyCard v-bind:familyInfo="internalData.familyInfo"></FamilyCard>
        </div>
        <!-- 检验信息 -->
        <div class="module-item">
          <div class="title">检验信息</div>
          <div class="module-item-content">
            <div class="module-item-label auto">开立时间：</div>
            <div class="module-item-value">{{internalData.createdTime}}</div>
          </div>
          <div class="module-item-content">
            <div class="module-item-label auto">执行科室：</div>
            <div class="module-item-value">{{internalData.doctorDep}}</div>
          </div>
        </div>
        <!--费用明细-->
        <div class="module-item">
          <div class="title mt16">费用明细</div>
          <div class="brief">
            <!-- 检验单卡片 -->
            <InspectionCard v-bind:list="internalData.checkOrderDetails"
                            v-bind:totalPrice="internalData.totalMoney"
                            v-bind:orderNo="internalData.orderNo"
                            v-bind:orderId="internalData.orderId"></InspectionCard>

          </div>
        </div>
      </div>
      <!-- 订单收费明细 -->
      <div class="module message"
           v-if="moneyRecord.length>0">
        <div class="module-item-content message size-14"
             v-for="(item,index) in moneyRecord"
             :key="index">
          <div class="module-item-label">{{item.name}}：</div>
          <div class="module-item-value">
            <span v-if="isNaN(item.value.substring(1))">{{item.value}}</span>
            <peace-price v-bind:price="item.value.substring(1)"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"
                         v-else></peace-price>
          </div>
        </div>
      </div>
      <div class="module message"
           v-else>
        <div class="module-item-content message size-14">
          <div class="module-item-label">订单费用：</div>
          <div class="module-item-value">
            <peace-price v-bind:price="internalData.totalMoney"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="14"></peace-price>
          </div>
        </div>
      </div>

      <!--  自费支付-->
      <div class="module money">
        <div class="brief right">自费支付：
          <div class="money">
            <span v-if="internalData.refundTime "
                  style="margin-right:-20px;">（已退款）</span>
            <peace-price v-bind:price="  internalData.payStatus===ENUM.PAY_STATUS.未支付  ? internalData.payMoney:internalData.orderMoney"
                         v-bind:transformOrigin="'right'"
                         v-bind:size="16"></peace-price>
          </div>
        </div>
      </div>

      <!--订单操作时间轴-->
      <div class="module">
        <div class="module-item-content size-14">
          <div class="module-item-label">订单编号：</div>
          <div class="module-item-value">{{ internalData.orderNo }}</div>
        </div>
        <div class="module-item-content size-14">
          <div class="module-item-label">订单时间：</div>
          <div class="module-item-value">{{ internalData.orderTime }}</div>
        </div>
        <template v-if="internalData.paymentType">
          <div class="module-item-content start size-14">
            <div class="module-item-label">支付方式：</div>
            <div class="module-item-value">{{paymentTypeText}}</div>
          </div>
          <div class="module-item-content size-14">
            <div class="module-item-label">支付时间：</div>
            <div class="module-item-value">{{ internalData.payTime }}</div>
          </div>
        </template>
        <div class="module-item-content size-14"
             v-if="internalData.orderStatus== ENUM.ORDER_STATUS.已取消">
          <div class="module-item-label">取消时间：</div>
          <div class="module-item-value">{{ internalData.cancelTime }}</div>
        </div>
        <div class="module-item-content size-14"
             v-if="internalData.refundTime">
          <div class="module-item-label">退款时间：</div>
          <div class="module-item-value">{{ internalData.refundTime }}</div>
        </div>
      </div>
      <!-- 联系客服 -->
      <div class="module phone"
           v-if="canShowPhoneBox"
           @click="callPhone">
        <div class="module-item">
          <van-image :src="require('@src/assets/images/ic_call_default.png')"></van-image>
          <span>联系客服</span>
        </div>
      </div>

    </div>
    <!-- footer -->
    <template>
      <!-- <div class="footer fixedBottom"
           v-if="canShowCancelBottom">
        <div class="footer-btn wait-btn"
             @click="showCancellPop(internalData)">
          {{internalData.inquiryInfo.serviceType=='returnVisit'?'取消预约':'取消订单'}}</div>
      </div> -->
      <div class="count-down"
           v-bind:style="{'bottom':footerHeight}"
           v-if="canShowPayBottom">
        <span>订单 </span>
        <van-count-down millisecond
                        @finish="finish(internalData)"
                        :time="internalData.time"
                        format="mm:ss" />
        <span> 后自动关闭</span>
      </div>
      <div class="pay fixedBottom"
           v-if="canShowPayBottom">
        <div class="pay-item">
          <div class="money">
            <span>应付金额 :</span>
            <peace-price v-bind:price="internalData.orderMoney"
                         v-bind:size="18"></peace-price>
          </div>
        </div>
        <div class="pay-item">
          <van-button class="is__small"
                      round
                      @click="showCancellPop(internalData)">取消订单</van-button>
          <peace-button class="is__small"
                        @click="goToPay(internalData)"
                        round
                        type="primary"
                        throttle
                        :throttleTime="3000">
            立即支付
          </peace-button>
        </div>
      </div>
    </template>

    <!-- 确认支付弹框 -->
    <ExpenseDetail v-model="dialog.visible"
                   @changeFlag="changeFlag"
                   :info="dialog.data"></ExpenseDetail>

    <!-- 电话弹框 -->
    <template>
      <CallPhone v-model="phoneDialog.visible"
                 :phone="phoneDialog.data.phone"></CallPhone>
    </template>

  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import { Dialog, CountDown } from 'vant'
Vue.use(CountDown)

import ExpenseDetail from '@src/views/components//ExpenseDetail'
import CallPhone from '@src/views/components/CallPhone'

import DoctorCard from './DoctorCard.vue'
import FamilyCard from './FamilyCard.vue'
import InspectionCard from './InspectionCard.vue'
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保卡支付: 'yibaopay'
  },
  /** 支付状态 */
  PAY_STATUS: {
    未支付: 0,
    已支付: 1,
    退款中: 2,
    已退款: 3
  },
  /** 订单状态   1：待支付 2：已取消 3：已完成*/
  ORDER_STATUS: {
    待支付: 1,
    已取消: 2,
    已完成: 3
  },

  OREDER_STATUS_TEXT: {
    1: '请及时缴费，完成后到执行科室进行',
    2: '订单已取消，如遇紧急情况请及时就医',
    3: '祝您身体健康'
  },
  /** isShowCancelButton 0不显示1显示 */
  CANCEL_BUTTON_STATUS: {
    不显示: 0,
    显示: 1
  }
}
export default {
  components: {
    DoctorCard,
    FamilyCard,
    InspectionCard,

    ExpenseDetail,
    CallPhone,

    [Dialog.Component.name]: Dialog.Component
  },

  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      ENUM: ENUM,
      internalData: {},
      firstLoad: false,
      footerHeight: '0px',
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },

      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    },
    canShowPayBottom: {
      handler() {
        this.$nextTick(() => {
          const element = document.querySelector('.pay')
          const countDownEle = document.querySelector('.count-down')
          this.footerHeight = element ? element.clientHeight + 'px' : '0px'
          this.payBottomHeight = element && countDownEle ? element.clientHeight + countDownEle.clientHeight + 8 + 'px' : '0px'
        })
      },
      immediate: true
    }
  },
  computed: {
    moneyRecord() {
      const list = this.internalData?.moneyRecord || []
      if (!Array.isArray(list)) {
        return []
      }
      return list
    },

    paymentTypeText() {
      return Object.keys(ENUM.PAYMENT_TYPE).find((key) => ENUM.PAYMENT_TYPE[key] === this.internalData.paymentType)
    },

    orderStatusMessage() {
      return this.ENUM.OREDER_STATUS_TEXT[this.internalData.orderStatus]
    },
    canShowPayBottom() {
      return this.internalData?.orderStatus === ENUM.ORDER_STATUS.待支付
    },

    canShowPhoneBox() {
      return true
      // return this.phoneDialog?.data?.phone
    }
  },

  activated() {
    this.get()
  },

  methods: {
    callPhone() {
      this.phoneDialog.visible = true
    },

    changeFlag() {
      this.dialog.visible = false
      this.get()
    },

    get() {
      this.getDetail()
    },
    finish(data) {
      if (!this.canShowPayBottom) return
      data.inquiryInfo.time = 0
      this.cancelInquiryOrder(data.orderInfo.orderNo)
    },
    cancelInquiryOrder(orderNo) {
      let params = {
        orderNo: orderNo,
        cancelType: 2
      }
      peace.service.patient.cancel(params).finally(() => {
        this.getDetail()
      })
    },

    goToPay(data) {
      let order = data.orderInfo
      let totalMoney = order.totalMoney
      if (!Number(totalMoney)) {
        this.getDetail()
        return
      }
      let orderNo = order.orderNo
      peace.wx.pay({ orderNo }, null, this.getDetail, this.getDetail)
    },
    getDetail() {
      let params = {
        orderId: 'ardcfrtrew'
      }

      peace.service.inquiry.getCheckOrderDetail(params).then((res) => {
        this.internalData = res.data
        this.firstLoad = true
      })
    },

    showCancellPop(item) {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消咨询？'
      })
        .then(() => {
          const params = {
            orderNo: item.orderNo
          }
          peace.service.patient
            .cancel(params)
            .then((res) => {
              peace.util.alert(res.msg)

              this.get()
            })
            .catch((res) => {
              if (res.data.code == '202') {
                this.invoiceDialog.visible = true
                this.invoiceDialog.data.message = res.data.msg
              } else {
                setTimeout(() => {
                  this.get()
                }, 1500)
              }
            })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
//footer

.fixedBottom {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0px -1px 1px 0px rgba(51, 51, 51, 0.16);
}

.footer {
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 8px 16px 24px;
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 40px;
    height: 48px;
    padding: 12px 0;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    &.chat-btn {
      color: #fff;
      background: rgba(0, 202, 173, 1);
      border: 1px solid rgba(0, 198, 174, 1);
    }
    &.wait-btn {
      color: #999;
      border: 1px solid #ccc;
    }
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.count-down {
  position: fixed;
  left: 0;
  width: 100%;
  height: 36px;
  font-size: 12px;
  background: #fefceb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f96a0e;
  .van-count-down {
    color: #f96a0e;
  }
  > span {
    margin: 0 3px;
  }
}
.pay {
  padding: 24px 16px;
  justify-content: space-between;
  .pay-item {
    display: flex;
    align-items: center;
    flex: 1;
    .money {
      color: #000;
      font-size: 16px;
      .peace-price {
        color: #f2223b;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
.module-item-content {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 24px;
  justify-content: flex-start;
  &.size-14 {
    font-size: 14px;
    line-height: 20px;
  }
  &.message {
    justify-content: space-between;
  }
  &.start {
    align-items: flex-start;
    .module-item-value {
      word-break: break-all;
    }
  }
  &.img {
    display: block;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  &:last-child {
    border-bottom: 0;
  }
  .module-item-label {
    color: rgba(51, 51, 51, 0.6);
    min-width: 5.5em;
    &.auto {
      min-width: auto;
    }
  }
  .module-item-value {
    color: #333333;
    &.img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 5px 0;
      .img {
        width: 60px;
        height: 60px;
        margin: 5px 8px 5px 0;
        &:nth-child(5n) {
          margin-right: 0 !important;
        }
        img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 2px;
          overflow: hidden;
        }
      }
    }
  }
}
.module-item {
  &.record {
    .title {
      margin: 0;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
}
.module-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .module-item-more {
    color: #999;
    font-weight: normal;
    padding-top: 10px;
  }
}
.page {
  min-height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 0.1px;
}
.consult-detatil {
  background-color: #f5f5f5;
  color: #333;
  min-height: 100%;

  .module {
    background: #fff;
    margin-top: 0;
    padding: 16px;
    margin-bottom: 8px;

    &.order {
      .module-item {
        &:first-child {
          .title {
            margin-top: 0;
          }
        }
      }
    }
    &.money {
      margin-top: -16px;
      justify-content: space-between;
      padding: 0 16px;
      .right {
        padding-top: 8px;
        padding-bottom: 16px;
        border-top: 1px dashed rgba(51, 51, 51, 0.1);
      }
    }
    &.phone {
      margin-top: -8px;

      color: rgba(51, 51, 51, 0.6);
      font-size: 14px;
      padding: 0 16px;
      .module-item {
        width: 100%;
        padding: 16px 0;
        border-top: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
      }

      .van-image {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
  .top-title {
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    // line-height: 1;
    display: flex;
    align-items: flex-end;
    margin-bottom: 9px;
  }
  .type-tag {
    padding: 3px 4px 4px 6px;
    height: 24px;
    border-radius: 8px 8px 8px 0px;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    margin-left: 4px;
    background-color: #00c6ae;
  }
  .status-message {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
  }
  .brief {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    line-height: 24px;
  }
  .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 12px;
    margin-top: 16px;
    &::before {
      position: absolute;
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background: $primary;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .money {
      color: #f2223b;
    }
  }
}
</style>
