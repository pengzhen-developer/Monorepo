<template>

  <!-- 消息内容 -->
  <div class="message-body">
    <div class="body-size"
         v-html="text"></div>
  </div>
</template>

<script>
export default {
  props: {
    /*
     * 内容
     */
    text: {
      type: String,
      required: true
    }
  }
}
</script>

