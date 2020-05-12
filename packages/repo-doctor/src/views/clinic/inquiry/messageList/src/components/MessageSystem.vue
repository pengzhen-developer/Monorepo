<template>

  <!-- 消息内容 -->
  <div class="message-body">
    <div v-html="text"
         @click="onClickText()"></div>
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
  },

  methods: {
    onClickText() {
      this.$emit('onClickText')
    }
  }
}
</script>

