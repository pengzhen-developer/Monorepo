<template>
  <div class="triangle">
    <MessageAudio :text="text"
                  :audioUrl="audioUrl"
                  :audioType="audioType"
                  :audioWidth="audioWidth"
                  :flow="flow"></MessageAudio>
  </div>
</template>

<script>
import MessageAudio from './MessageAudio'

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
    MessageAudio
  },
  computed: {
    text() {
      return this.getMessageText()
    },
    audioWidth() {
      return this.getAudioWidth()
    },
    audioUrl() {
      return this.getAudioUrl()
    },
    audioType() {
      return this.getAudioType()
    }
  },
  methods: {
    getMessageText() {
      if (this.message?.content?.dur >= 0 || this.message?.file?.dur >= 0) {
        const dur = this.message?.content?.dur || this.message?.file?.dur
        return Math.ceil(dur / 1000) + '”'
      }
    },
    getAudioWidth() {
      if (this.message?.content?.dur >= 0 || this.message?.file?.dur >= 0) {
        const dur = this.message?.content?.dur || this.message?.file?.dur
        return (1.5 + Math.ceil(dur / 1000) * 0.03).toFixed(2) + 'rem'
      }
    },
    getAudioUrl() {
      if (this.message?.content?.url || this.message?.file?.url) {
        return this.message?.content?.url || this.message?.file?.url
      }
    },
    getAudioType() {
      if (this.message?.content?.ext || this.message?.file?.ext) {
        const ext = this.message?.content?.ext || this.message?.file?.ext
        return 'audio/' + (ext === 'mp3' ? 'mpeg' : ext)
      }
    }
  }
}
</script>

<style>
</style>