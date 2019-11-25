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
                          style="display: inline-block" />秒后自动跳转订单详情</p>
      </template>
    </div>

    <div class="footer">
      <template>
        <p>
          <span>若未跳转，</span>
          <a @click="redirectOrder"
             class="link">请点击</a>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    finished() {
      this.redirectOrder()
    },

    redirectOrder() {
      let json = this.$route.params.json

      // 跳转订单详情
      this.$router.replace(`/setting/userConsultDetail/${json}`)
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
