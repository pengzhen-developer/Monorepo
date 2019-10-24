<template>
  <div class="doctor-inquiry-pay-result">
    <div class="header">
      <template>
        <img src="@src/assets/images/default page_img_success@2x.png"
             style="width: 160px;" />
      </template>
    </div>

    <div class="content">
      <template>
        <p>支付成功</p>
        <p>系统将在
          <van-count-down :time="3000"
                          format="ss"
                          @finish="finished"
                          style="display: inline-block" />秒后自动跳转医生诊室</p>
      </template>
    </div>

    <div class="footer">
      <template>
        <p>
          <span>若未跳转，</span>
          <a @click="redirectMessage"
             class="link">请点击</a>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { CountDown } from 'vant'
Vue.use(CountDown)
export default {
  data() {
    return {}
  },

  methods: {
    finished() {
      this.redirectMessage()
    },

    redirectMessage() {
      const params = peace.util.decode(this.$route.params.json)
      const paramsForMessageList = peace.util.encode({
        id: 'p2p-' + params.doctorId,
        scene: 'p2p',
        beginTime: params.startTime.toDate().getTime(),
        to: params.doctorId
      })

      // 跳转聊天详情
      this.$router.push(`/components/messageList/${paramsForMessageList}`)
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
