<template>
  <van-popup position="bottom"
             round
             style="min-height:30%;"
             :close-on-click-overlay="false"
             v-model="show">

    <div class="cost">
      <van-image class="close"
                 @click="changeFlag('cancel')"
                 :src="require('@src/assets/images/ic_close@2x.png')"></van-image>
      <div class="cost-content">
        <template v-if="moneyRecord&&moneyRecord.length>1">
          <div class="cost-platform"
               v-for="(item,index) in moneyRecord"
               v-bind:key="index">
            <div class="cost-platform-label">{{item.name}}</div>
            <div class="cost-platform-content">{{item.value}}</div>
          </div>
        </template>
        <div class="cost-platform selfpay">
          <div class="cost-platform-label">自费支付:</div>
          <div class="cost-platform-content">￥{{selfPayMoney}}</div>
        </div>
      </div>
      <div class="cost-footer">
        <peace-button class="cost-submit"
                      round
                      type="primary"
                      throttle
                      :throttleTime="3000"
                      @click="pay">确认支付</peace-button>
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
              // 去咨询界面
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
      } else {
        this.drugPayCallback()
      }
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
      const json = peace.util.encode({ OrderId: this.orderNo })
      this.$router.replace(`/order/userDrugDetail/${json}`)
    },
    finishHander() {
      if (this.type == 'register') {
        this.cancelRegisterOrder()
      } else if (this.type == 'inquiry') {
        this.cancelInquiryOrder()
      } else {
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
  padding: 23px 15px 15px 15px;
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
    padding: 30px 15px 70px;
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
    border-bottom: 1px solid #eee;
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
      border-bottom: 0;
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
    justify-content: center;
    padding: 12px 15px 11px 15px;
    .cost-submit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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