<template>
  <!-- 发票弹窗 -->
  <van-overlay :show="visible"
               @click="close">
    <div class="cancel-dialog">
      <div v-html="message"
           class='cancel-text'></div>
      <div class="cancel-confirm"
           @click="close">知道了</div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'ApplyForInvoice',
  model: {
    prop: 'visible',
    event: 'applyForInvoice'
  },
  props: {
    visible: Boolean,
    message: String
  },
  methods: {
    close() {
      this.$emit('applyForInvoice', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel-dialog {
  box-sizing: border-box;
  width: 270px;
  height: 151px;
  padding: 23px 23px 0 23px;
  background-color: #ffffff;
  border-radius: 2px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cancel-text {
  font-size: 14px;
  color: #999;
  line-height: 21px;
  text-align: center;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.cancel-confirm {
  margin-top: 20px;
  border-top: 2px solid #e8e8e8;
  font-size: 16px;
  color: $primary;
  line-height: 40px;
  text-align: center;
}
</style>