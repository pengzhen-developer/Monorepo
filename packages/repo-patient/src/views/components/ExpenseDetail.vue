<template>
  <div class="cost">
    <div class="header"
         v-if="orderStatus==1">
      <span>请在</span>
      <van-count-down millisecond
                      @finish="finishHander"
                      :time="time"
                      format="mm:ss" />
      <span>后内完成支付，超时订单自动取消</span>
    </div>
    <div class="cost-content">
      <div>自费金额</div>
      <div class="cost-money"><span>￥</span>{{money}}</div>
      <div class="cost-code">订单编号： {{orderNo}}</div>

    </div>
    <div class="cost-platform">
      <div class="cost-platform-label">收款方</div>
      <div class="cost-platform-content">{{payee}}</div>
    </div>
    <div class="cost-footer">
      <van-button class="cost-submit"
                  type="primary"
                  round
                  @click="pay">立即支付</van-button>
    </div>
    <!-- <div class="cost-tip">支付安全由中国人民财产保险股份有限公司承保</div> -->

  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Dialog } from 'vant'
Vue.use(Dialog)
import { CountDown } from 'vant'
Vue.use(CountDown)
export default {
  data() {
    return {
      type: '',
      orderNo: '',
      money: '',
      time: 0,
      createdTime: '',
      interval: null,
      orderStatus: '',
      payee: '',
      inquiryId: ''
    }
  },
  activated() {
    const json = peace.util.decode(this.$route.params.json)
    this.type = json.orderType || json.type
    this.orderNo = json.orderNo
    this.money = json.money.toString().toFixed(2)
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo() {
      let orderNo = this.orderNo
      peace.service.index.getOrderInfo({ orderNo }).then((res) => {
        let data = res.data
        this.createdTime = data.createdTime
        if (data.expireTime > data.currentTime) {
          this.time = (data.expireTime - data.currentTime) * 1000
        }
        this.orderStatus = data.orderStatus
        this.payee = data.payee
        this.orderNo = data.orderNo
        this.money = data.orderMoney
        this.inquiryId = data.inquiryId
      })
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
.cost {
  min-height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  position: relative;
  .cost-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 0 50px;
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
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
  .cost-platform {
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 15px;
    .cost-platform-label {
      color: #666;
    }
    .cost-platform-content {
      color: #000;
    }
  }
  .cost-footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 68px;
    background-color: #fff;
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