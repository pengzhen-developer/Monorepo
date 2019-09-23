<template>
  <div class="doctor-inquiry-pay">
    <div class="header">请在 15 分钟内完成支付，超时订单自动取消</div>

    <div class="content">
      <van-cell title="问诊方式"
                :value="params.typeName" />
      <van-cell title="医生姓名"
                :value="params.doctorName" />
      <van-cell title="应付金额"
                :value="params.money+'通证'" />
    </div>

    <slot name="custom"></slot>

    <div class="footer">
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span>实际支付：</span>
          <span class="dc">{{params.money}}通证</span>
        </template>
        <van-button @click="pay"
                    type="primary">立即支付</van-button>
      </van-cell>
    </div>
    <PasswordPay :show="showPassWordKeyboard"
                 :type="params.type"
                 :money="params.money"
                 @onCallback="payCallback"
                 :params="{orderNo: params.orderNo}"></PasswordPay>
  </div>
</template>

<script>
import peace from '@src/library'
import PasswordPay from '@src/views/components/PasswordPay'

export default {
  components: {
    PasswordPay
  },
  data() {
    return {
      data: {},
      params: {},
      showPassWordKeyboard: false
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
  },

  methods: {
    pay() {
      this.showPassWordKeyboard = true

      // this.$router.push(`/components/doctorInquiryPayResult/${json}`)
    },
    payCallback(data) {
      let json

      data.payShow == false && (this.showPassWordKeyboard = data.payShow)
      data.success &&
        ((json = peace.util.encode(data.data)),
        this.$router.push(`/components/doctorInquiryPayResult/${json}`))
    }
  }
}
</script>

<style lang="scss" scoped>
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