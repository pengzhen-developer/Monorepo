<template>
  <div class="page"
       v-if="firstLoad">
    <div class="consult-detatil"
         :style="{'margin-bottom':footerHeight}">

      <!--医生名片-->
      <div class="module"
           v-if="internalData.doctorInfo">
        <DoctorCard v-bind:doctorInfo="internalData.doctorInfo"
                    v-bind:typeText="'检验挂号单'"></DoctorCard>
      </div>

      <!--订单内容-->
      <div class="module order">
        <div class="module-item"
             v-if="internalData.familyInfo">
          <div class="title">个人信息</div>
          <FamilyCard v-bind:familyInfo="internalData.familyInfo"></FamilyCard>
        </div>

        <!--病情描述-->
        <div class="module-item">
          <div class="title mt16">检验项目</div>
          <div class="brief">
            <!-- 检验单卡片 -->
            <InspectionCard v-bind:list="internalData.checkRegisteringOrderDetails"
                            v-bind:totalPrice="internalData.checkRegisteringOrderTotalPrice"
                            v-bind:orderNo="internalData.orderNo"
                            v-bind:orderId="internalData.orderId"
                            v-bind:showFooter="true"></InspectionCard>
          </div>
        </div>
      </div>
      <OrderPaymentCard v-bind:info="info"
                        v-if="firstLoad"
                        v-on:onChooseDeductionType="onChooseDeductionType"></OrderPaymentCard>

      <!-- footer -->
      <div class="pay fixedBottom">
        <div class="pay-item">
          <van-button round
                      @click="goToInspectionRegisteredDetail"
                      type="primary"
                      :disabled="sending"
                      size="large">提交订单</van-button>
        </div>
      </div>

      <!-- 确认支付弹框 -->
      <ExpenseDetail v-model="dialog.visible"
                     @changeFlag="changeFlag"
                     :info="dialog.data"></ExpenseDetail>

    </div>
  </div>
</template>

<script>
import peace from '@src/library'

import Vue from 'vue'
import { Dialog, CountDown } from 'vant'
Vue.use(CountDown)

import ExpenseDetail from '@src/views/components//ExpenseDetail'

import DoctorCard from './DoctorCard'
import FamilyCard from './FamilyCard'
import InspectionCard from './InspectionCard'
import OrderPaymentCard from './OrderPaymentCard'
const ENUM = {
  // 支付类型
  // wxpay（微信）
  // alipay（支付宝）
  // yibaopay（医保支付）
  PAYMENT_TYPE: {
    微信支付: 'wxpay',
    支付宝支付: 'alipay',
    医保卡支付: 'yibaopay'
  }
}
export default {
  components: {
    DoctorCard,
    FamilyCard,
    InspectionCard,
    OrderPaymentCard,
    ExpenseDetail,
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
      permissionsDeductions: [],
      currentSeriveInfo: {},
      firstLoad: false,
      sending: false,
      footerHeight: '0px',
      phoneDialog: {
        visible: false,
        data: {
          phone: ''
        }
      },
      paymentDialog: {
        visible: false
      },
      dialog: {
        visible: false,
        data: {}
      },

      payIndex: 0,
      info: {}
    }
  },
  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },
  computed: {
    moneyRecord() {
      const list = this.internalData?.moneyRecord || []

      return list
    },

    paymentTypeText() {
      return Object.keys(ENUM.PAYMENT_TYPE).find((key) => ENUM.PAYMENT_TYPE[key] === this.internalData.paymentType)
    },
    orderStatusText() {
      return Object.keys(ENUM.ORDER_STATUS).find((key) => ENUM.ORDER_STATUS[key] === this.internalData.orderStatus)
    },
    orderStatusMessage() {
      return ENUM.OREDER_STATUS_TEXT[this.internalData.orderStatus]
    },

    canShowPhoneBox() {
      return true
      // return this.phoneDialog?.data?.phone
    }
  },

  activated() {
    this.get()
    this.$nextTick(() => {
      const element = document.querySelector('.pay')
      this.footerHeight = element ? element.clientHeight + 8 + 'px' : '0px'
    })
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
    onChooseDeductionType(res) {
      if (res) {
        this.currentSeriveInfo = res
      }
    },
    getDetail() {
      let params = {
        orderId: 'sdfsdfvrru'
      }

      peace.service.inquiry.getCheckRegisterOrderDetail(params).then((res) => {
        this.internalData = res.data
        this.firstLoad = true
        this.info.doctorId = this.internalData.doctorId
        this.info.nethospitalId = this.internalData.doctorInfo.nethospitalId
        this.info.orderMoney = this.internalData.orderMoney
      })
    },
    goToInspectionRegisteredDetail(orderId) {
      const params = {
        orderId: orderId
      }

      let json = peace.util.encode(params)
      this.$router.replace(`/inspectionRegisteredDetail/${json}`)
    },
    apply() {
      // if (this.yibaoText && !this.yibaoTypeText) {
      //   return peace.util.alert('请选择医保类型')
      // }
      this.sending = true
      let params = peace.util.deepClone(this.params)
      params.medCardNo = this.yibaoInfo.medCardNo || ''
      params.patientEquitiesId = this.hasSelectedServicePackage == false ? '' : this.servicePackageDialog.data.patientEquitiesId
      let message = ''
      switch (this.paymentDialog.data.value) {
        case 'yibaopay':
          params.patientEquitiesId = ''
          message = !params.medCardNo ? '请填写医保卡号' : ''
          break
        case 'servicePackage':
          params.medCardNo = ''
          message = !params.patientEquitiesId ? '请选择服务包' : ''
          break
        default:
          params.patientEquitiesId = ''
          params.medCardNo = ''
          break
      }
      if (message) {
        this.sending = false
        return peace.util.alert(message)
      }

      peace.service.inquiry
        .apply(params)
        .then((res) => {
          // 订单提交成功
          if (res.data.errorState === 0) {
            // 需要支付，跳转支付
            if (res.data.inquiryStatus === 1) {
              if (res.data.inquiryType == 'returnVisit' && res.data.isCurrentDate == 2) {
                this.goToInspectionRegisteredDetail(res.data)
              } else {
                this.gotoExpenseDetailPage(res.data)
              }
            }
            // 不需要支付，跳转订单
            else {
              this.goToInspectionRegisteredDetail(res.data)
            }
          }

          // 订单提交失败
          // errorState:1 存在未支付订单， 跳转订单
          if (res.data.errorState === 1) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '去看看'
            }).then(() => {
              this.goToConsultDetail(res.data)
            })
          }

          // errorState:2 存在未结束订单，跳转咨询
          if (res.data.errorState === 2) {
            return Dialog.confirm({
              title: '提示',
              message: res.msg,
              confirmButtonText: '继续咨询'
            }).then(() => {
              this.goToMessage(res.data)
            })
          }
        })
        .catch((res) => {
          //203  号源不足 或 号源过期
          if (res.data.code == '203') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定'
            }).then(() => {
              this.changeSource()
            })
          }
          //205 医保不可用
          else if (res.data.code == '205') {
            return Dialog.confirm({
              title: '提示',
              message: res.data.msg,
              confirmButtonText: '确定',
              showCancelButton: false
            }).then(() => {
              this.goToConsultDetail(res.data.data)
            })
          } else {
            peace.util.alert(res.data.msg)
          }
        })
        .finally(() => {
          this.sending = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.pay {
  padding: 8px 16px 24px;
  justify-content: space-between;
  .pay-item {
    display: flex;
    align-items: center;
    flex: 1;
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
}
</style>
