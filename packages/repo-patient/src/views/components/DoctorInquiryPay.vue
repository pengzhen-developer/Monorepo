<template>
  <div class="doctor-inquiry-pay">
    <div class="header"
         v-if="orderStatus==1">
      <span>请在</span>
      <van-count-down millisecond
                      @finish="finishHander"
                      :time="time"
                      format="mm:ss" />
      <span>后内完成支付，超时订单自动取消</span>
    </div>

    <div class="content">
      <van-cell title="问诊方式"
                :value="params.typeName" />
      <van-cell title="医生姓名"
                :value="params.doctorName" />
      <van-cell title="应付金额"
                :value="params.money+'元'" />
      <div class="payway">选择支付方式</div>
      <div class="wechat">
        <div class="left">
          <i class="wechat"></i>
          <span>微信支付</span>
        </div>
        <i class="icon-close"></i>
      </div>
    </div>

    <slot name="custom"></slot>

    <div class="footer">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span>应付金额：</span>
          <span class="dc">{{params.money}}元</span>
        </template>
        <van-button @click="pay"
                    type="primary">立即支付</van-button>
      </van-cell>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)
import { Dialog } from 'vant'
Vue.use(Dialog)
export default {
  components: {},
  data() {
    return {
      orderStatus: '',
      appid: '',
      data: {},
      params: {},
      time: 0,
      createdTime: '',
      interval: null
    }
  },
  created() {},
  mounted() {
    this.getOrderInfo()
  },
  methods: {
    finishHander() {
      let { typeName, orderNo } = peace.util.decode(this.$route.params.json)
      if (typeName.includes('挂号')) {
        this.cancelRegisterOrder(orderNo)
      } else {
        this.cancelInquiryOrder(orderNo)
      }
    },
    cancelInquiryOrder(orderNo) {
      let params = {
        orderNo: orderNo,
        cancelType: 2
      }
      peace.service.patient.cancel(params).then(() => {
        this.payCallback()
      })
    },

    cancelRegisterOrder(orderNo) {
      let params = {
        orderNo: orderNo,
        cancelType: 2
      }
      peace.service.appoint.orderCancel(params).then(() => {
        this.payCallback()
      })
    },
    getOrderInfo() {
      let that = this
      this.params = peace.util.decode(this.$route.params.json)
      let orderNo = this.params.orderNo
      peace.service.index.getOrderInfo({ orderNo }).then((res) => {
        let data = res.data
        this.createdTime = data.createdTime
        if (data.expireTime > data.currentTime) {
          that.time = (data.expireTime - data.currentTime) * 1000
        }
        this.orderStatus = data.orderStatus
      })
    },

    pay() {
      let { orderNo } = peace.util.decode(this.$route.params.json)
      let params = { orderNo }
      let orderExp = (res) => {
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
      }
      peace.wx.pay(params, orderExp, this.payCallback)
    },

    payCallback() {
      let { typeName, orderNo, inquiryId } = peace.util.decode(this.$route.params.json)
      if (typeName.includes('挂号')) {
        let orderType = 'register'
        let json = peace.util.encode({ orderInfo: { orderNo, orderType } })
        this.$router.replace(`/setting/order/userOrderDetail/${json}`)
      } else {
        let json = peace.util.encode({
          // ...peace.util.decode(this.$route.params.json),
          // startTime: new Number(this.createdTime) * 1000
          inquiryId: inquiryId
        })
        //支付成功去掉支付中转页 直接跳转详情
        // this.$router.replace(`/components/doctorInquiryPayResult/${json}`)
        this.$router.replace(`/setting/userConsultDetail/${json}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-count-down {
  color: inherit;
}
.doctor-inquiry-pay {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(249, 249, 249, 1);

  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 36px;
    font-size: 12px;
    background: rgba(254, 252, 235, 1);
    color: #f96a0e;
  }

  .content {
    flex: 1;
    .payway {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
    }
    .wechat {
      height: 60px;
      padding: 0 15px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        i.wechat {
          width: 28px;
          height: 28px;
          display: inline-block;
          background: url('~@src/assets/images/ic_wechat payment.png') no-repeat;
          background-size: 100%;
          vertical-align: middle;
          margin-right: 8px;
        }
      }
      i.icon-close {
        width: 21px;
        height: 21px;
        display: inline-block;
        background: url('~@src/assets/images/ic_choose.png') no-repeat;
        background-size: 100%;
        vertical-align: middle;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-cell {
      padding: 0 0 0 10px;
      font-size: 12px;

      .van-cell__title {
        display: flex;
        align-items: center;
      }

      .van-button {
        width: 140px;
      }

      .dc {
        font-size: 18px;
        font-weight: 600;
        color: rgba(242, 34, 59, 1);
      }
    }
  }
}
</style>
