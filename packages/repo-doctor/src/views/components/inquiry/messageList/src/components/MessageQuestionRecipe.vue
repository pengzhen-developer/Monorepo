<template>
  <!-- 消息内容 -->
  <div class="message-body"
       style="padding: 3px 20px;">
    <div @click="onClickText()"
         class="text-grey-999">您所开处方被质疑，请尽快处理，<span class="text-primary">立即查看处方</span></div>
  </div>
</template>

<script>
export default {
  props: {},

  methods: {
    onClickText() {
      this.$emit('onClickText')
    }
  }
}
</script>
