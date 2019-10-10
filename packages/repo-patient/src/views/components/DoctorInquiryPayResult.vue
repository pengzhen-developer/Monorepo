<template>
  <div class="doctor-inquiry-pay-result">
    <div class="header">
      <template>
        <img src="@src/assets/images/default page_img_success@2x.png"
             style="width: 160px;" />
      </template>
      <!--      <template v-if="!payResult.status">-->
      <!--        <img src="@src/assets/images/default page_img_fail@2x.png" style="width: 160px;" />-->
      <!--      </template>-->
    </div>

    <div class="content">
      <template>
        <p>支付成功</p>
        <p>系统将在  <van-count-down
                :time="3000"
                format="ss"
                @finish="finished"
        />秒后自动跳转医生诊室</p>
      </template>
      <!--      <template v-if="!payResult.status">-->
      <!--        <p>支付失败</p>-->
      <!--        <p>可用通证余额不足</p>-->
      <!--      </template>-->
    </div>

    <div class="footer">
      <template>
        <p>
          <span>若未跳转，</span>
          <a @click="redirectMessage"
             class="link">请点击</a>
        </p>
      </template>
      <!--      <template v-if="!payResult.status">-->
      <!--        <van-button round style="width: 160px; margin: 20px 0 0 0;" type="info">立即充值</van-button>-->
      <!--      </template>-->
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue';
import { CountDown } from 'vant';
Vue.use(CountDown);
export default {
  data() {
    return {
      params: {}
    }
  },

  created() {
    this.params = peace.util.decode(this.$route.params.json)
    // if (this.payResult.status) {
   // this.redirectInterval = setTimeout(this.redirectMessage, 3000)
    // }
  },

  deactivated() {
   // window.clearInterval(this.redirectInterval)
  },

  methods: {
    finished() {
     this.redirectMessage();
    },
    redirectMessage() {
      // 延迟1000ms， 跳转消息页， 最大限度确认消息通知已推送
      setTimeout(() => {
        this.$router.push({
          name: '/message/index',
          params: {
            sessionId: 'p2p-' + this.params.doctorId
          }
        })
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-inquiry-pay-result {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 120px;

  .header,
  .content,
  .footer {
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;

    .link {
      color: $-color--primary;
    }
  }
}
</style>
