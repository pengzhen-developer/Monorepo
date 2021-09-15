<template>
  <div>
    <MessageVideo :text="text"
                  :flow="flow"></MessageVideo>

  </div>
</template>

<script>
import MessageVideo from './MessageVideo'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    flow: {
      type: String,
      required: true
    }
  },

  components: {
    MessageVideo
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