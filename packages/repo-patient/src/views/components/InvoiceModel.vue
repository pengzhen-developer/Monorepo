<template>
  <!-- 发票弹窗 -->
  <van-overlay :show="showInvoiceModel"
               @click="changeFlag">
    <div class="overlay-container">
      <div class="overlay-content">
        <span>请持就诊卡赴医院发票补打窗口</span>
        <span>报本单发票号（{{receiptNumber}}）</span>
        <span>打印发票</span>
      </div>
      <div class="overlay-botton">如有疑问请拨打<a :href="'tel:01089239180'">01089239180</a></div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'InvoiceModel',

  model: {
    prop: 'showInvoiceModel',
    event: 'changeFlag'
  },

  props: {
    showInvoiceModel: {
      type: Boolean,
      required: true
    },
    receiptNumber: {
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

  .overlay-container {
    width: 80%;
    min-height: 151px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 23px 45px;
  }
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    line-height: 21px;
    span {
      word-break: break-all;
    }
  }
  .overlay-botton {
    color: #ccc;
    > a {
      color: $primary;
    }
  }
}
</style>