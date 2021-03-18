<template>
  <!-- 发票弹窗 -->
  <van-overlay :show="showRefundTip"
               @click="changeFlag">
    <div class="overlay-container"
         @click.stop="">
      <div class="overlay-header">退费说明</div>
      <div class="overlay-content">
        <div class="code"
             v-if="divisionId">
          <span>本单发票号</span><span>{{divisionId}}</span>
        </div>
        <div>1. 线上支付金额将在1-3个工作日内原路退回</div>
        <div>2. 医保卡支付金额需凭发票号到医院发票窗口补打发票，医院为您退回至医保卡</div>
      </div>
      <div class="overlay-botton"
           @click="changeFlag">
        我知道了
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'RefundTip',

  model: {
    prop: 'showRefundTip',
    event: 'changeFlag'
  },

  props: {
    showRefundTip: {
      type: Boolean,
      required: true
    },
    divisionId: {
      type: String,
      required: false
    }
  },

  methods: {
    changeFlag() {
      this.$emit('changeFlag', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .overlay-header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    margin-bottom: 10px;
  }
  .overlay-container {
    width: 280px;
    min-height: 236px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }
  .overlay-content {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 21px;
    word-break: break-all;
    div {
      color: #999;
    }
    .code {
      padding: 8px;
      min-height: 37px;
      background: #f9f9f9;
      border-radius: 2px;
      font-size: 15px;
      color: #333;
      font-weight: 400;
      line-height: 21px;
      font-family: PingFangSC-Regular, PingFang SC;
      margin-bottom: 8px;
      span + span {
        margin-left: 10px;
      }
    }
  }
  .overlay-botton {
    width: calc(100% + 32px);
    text-align: center;
    margin: 10px -16px 0 -16px;
    padding-top: 10px;
    border-top: 1px solid rgba(51, 51, 51, 0.05);
    color: $primary;
    font-size: 15px;
  }
}
</style>