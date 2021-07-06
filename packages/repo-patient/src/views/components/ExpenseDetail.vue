<template>
  <van-popup position="bottom"
             round
             style="min-height:30%;"
             :close-on-click-overlay="false"
             v-model="show">

    <div class="cost">
      <div class="cost-content">
        <template v-if="moneyRecord&&moneyRecord.length>1">
          <div class="cost-platform"
               v-for="(item,index) in moneyRecord"
               v-bind:key="index">
            <div class="cost-platform-label">{{item.name}}</div>
            <div class="cost-platform-content">
              <span v-if="isNaN(item.value.substring(1))">{{item.value}}</span>
              <peace-price v-bind:price="item.value.substring(1)"
                           v-bind:transformOrigin="'right'"
                           v-bind:size="15"
                           v-else></peace-price>
            </div>

          </div>
        </template>
        <div class="cost-platform selfpay">
          <div class="cost-platform-label">自费支付:</div>
          <div class="cost-platform-content">
            <peace-price v-bind:price="selfPayMoney"
                         v-bind:size="20"></peace-price>
          </div>

        </div>
      </div>
      <div class="cost-footer">
        <van-button round
                    @click="changeFlag('cancel')">取消</van-button>
        <peace-button class="cost-submit"
                      round
                      type="primary"
                      throttle
                      :throttleTime="3000"
                      @click="pay">确认</peace-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Dialog } from 'vant'
Vue.use(Dialog)
import { CountDown } from 'vant'
Vue.use(CountDown)
export default {
  name: 'ExpenseDetail',
  model: {
    prop: 'showCard',
    event: 'changeFlag'
  },
  props: {
    showCard: Boolean,
    info: Object
  },
  data() {
    return {
      show: false,
      createdTime: '',
      interval: null,
      orderStatus: '',
      payee: ''
    }
  },
  computed: {
    inquiryId() {
      return this.info.inquiryId
    },
    selfPayMoney() {
      return this.info.money && (this.info.money - 0).toFixed(2)
    },
    moneyRecord() {
      return this.info.moneyRecord
    },
    orderNo() {
      return this.info.orderNo
    },
    type() {
      return this.info.orderType
    }
  },
  watch: {
    showCard: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    }
  },

  methods: {
    trackByPayOrder() {
      const params = {
        organization_name: this.info.hospitalName,
        business_type: this.info.businessType,
        order_id: this.orderNo,
        trigger_page: '划价页面',
        click_object: '确认支付',
        own_expense_pay_method: this.info.payMethod
      }
      peace.service.sensors.payOrder(params)
    },
    changeFlag(type) {
      this.show = false
      this.$emit('changeFlag', false)
      if (type == 'cancel') {
        this.payCallback()
      }
    },
    pay() {
      let params = { orderNo: this.orderNo }
      let orderExp = null
      if (this.type !== 'drug') {
        orderExp = this.orderExp()
      }
      this.trackByPayOrder()
      debugger
      peace.wx.pay(params, orderExp, this.payCallback, this.payCallback)
    },
    orderExp(res) {
      if (res && res.data) {
        return Dialog.confirm({
          title: '提示',
          message: res.data.msg,
          confirmButtonText: '去看看'
        }).then(() => {
          if (res.data.code == 202) {
            //只有在202时才可进入catch流程
            let inquiryId = res.data.data.inquiryId
            const params = {
              inquiryId
            }
            if (inquiryId != '') {
              // 去问诊界面
              let json = peace.util.encode(params)
              this.$router.replace(`/setting/userConsultDetail/${json}`)
            } else {
              // 去挂号界面
              let orderNo = res.data.data.orderNo
              let orderType = 'register'
              let json = peace.util.encode({ orderInfo: { orderNo, orderType } })
              this.$router.replace(`/setting/order/userOrderDetail/${json}`)
            }
          }
        })
      }
    },
    payCallback() {
      if (this.info?.isReport) {
        this.changeFlag()
        return
      }
      if (this.type == 'register') {
        this.registerPayCallback()
      } else if (this.type == 'inquiry') {
        this.inquiryPayCallback()
      } else if (this.type == 'servicePackage') {
        this.servicePackagePayCallback()
      } else if (this.type == 'drug') {
        this.drugPayCallback()
      } else if (this.type == 'inspectAdvance') {
        this.inspectAdvancePayCallback()
      } else if (this.type == 'inspect') {
        this.inspectPayCallback()
      }
    },
    servicePackagePayCallback() {
      const json = peace.util.encode({ orderNo: this.orderNo })
      this.$router.replace(`/setting/order/userServicePackageDetail/${json}`)
    },
    registerPayCallback() {
      let { orderType } = peace.util.decode(this.$route.params.json)

      let json = peace.util.encode({ orderInfo: { orderNo: this.orderNo, orderType } })
      this.$router.replace(`/setting/order/userOrderDetail/${json}`)
    },
    inquiryPayCallback() {
      let json = peace.util.encode({
        inquiryId: this.inquiryId
      })
      this.$router.replace(`/setting/userConsultDetail/${json}`)
    },
    drugPayCallback() {
      const json = peace.util.encode({ orderNo: this.orderNo })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    inspectAdvancePayCallback() {
      const json = peace.util.encode({ orderNo: this.info.orderNo })
      this.$router.replace(`/inspectRegisterDetail/${json}`)
    },
    inspectPayCallback() {
      const json = peace.util.encode({ orderNo: this.info.orderNo })
      this.$router.replace(`/inspectDetail/${json}`)
    },
    finishHander() {
      if (this.type == 'register') {
        this.cancelRegisterOrder()
      } else if (this.type == 'inquiry') {
        this.cancelInquiryOrder()
      } else if (this.type == 'servicePackage') {
        this.cancelServicePackageOrder()
      } else if (this.type == 'drug') {
        this.cancelDrugOrder()
      }
    },
    cancelInquiryOrder() {
      let params = {
        orderNo: this.orderNo,
        cancelType: 2
      }
      peace.service.patient.cancel(params).finally(() => {
        this.payCallback()
      })
    },

    cancelRegisterOrder() {
      let params = {
        orderNo: this.orderNo,
        cancelType: 2
      }
      peace.service.appoint.orderCancel(params).finally(() => {
        this.payCallback()
      })
    },
    cancelServicePackageOrder() {},
    cancelDrugOrder() {
      let params = { OrderId: this.orderNo }
      peace.service.purchasedrug.CancelOrder(params).finally(() => {
        this.payCallback()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  padding: 23px 16px 15px 16px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  font-size: 12px;
  background: rgba(254, 252, 235, 1);
  color: #f96a0e;
  .van-count-down {
    color: #f96a0e;
  }
}
.close {
  margin: 0;
  position: absolute;
  top: 2px;
  right: 14px;
  width: 20px;
  height: 20px;
  z-index: 2003;
}
.cost {
  min-height: 100%;
  width: 100%;
  position: relative;
  .cost-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 64px;
    width: 100%;
    background-color: #fff;
    .cost-code {
      font-size: 12px;
      color: #666;
    }
    .cost-money {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      color: $red;
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #f5f5f5;
      margin: 5px auto 15px;
    }
  }
  .cost-platform {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(51, 51, 51, 0.05);
    .cost-platform-label {
      color: #666;
      font-size: 16px;
    }
    .cost-platform-content {
      color: #999;
      font-size: 15px;
    }
    &.selfpay {
      margin-top: 10px;
      // border-bottom: 0;
      .cost-platform-label {
        color: #333;
      }
      .cost-platform-content {
        color: #ff344d;
        font-size: 20px;
      }
    }
  }
  .cost-footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 68px;
    // background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 16px 24px 16px;
    .van-button {
      width: 155px;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      border: none;
      &:first-child {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      &:last-child {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00c6ae;
        line-height: 24px;
      }
    }
  }

  .cost-tip {
    font-size: 12px;
    position: absolute;
    text-align: center;
    left: 0;
    bottom: 10px;
    color: #666;
  }
}
</style>