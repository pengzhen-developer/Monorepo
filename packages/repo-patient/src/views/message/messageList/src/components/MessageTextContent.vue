<template>
  <div class="triangle">
    <MessageText :text="text"></MessageText>

  </div>
</template>

<script>
import MessageText from './MessageText'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  components: {
    MessageText
  },
  computed: {
    text() {
      return this.getMessageText()
    }
  },
  methods: {
    getMessageText() {
      if (this.message.content && this.message.content.data && this.message.content.data.showTextInfo) {
        return this.message.content.data.showTextInfo.patientClientText
      }

      if (this.message.text) {
        return this.message.text
      }
    }
  }
}
</script>

<style>
</style>