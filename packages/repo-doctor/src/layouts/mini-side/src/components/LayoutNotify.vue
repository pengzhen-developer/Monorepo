<template>
  <div>
    <LayoutNotifyVideo ref="LayoutNotifyVideo"></LayoutNotifyVideo>
    <LayoutNotifyInquiry ref="LayoutNotifyInquiry"></LayoutNotifyInquiry>

    <slot></slot>
  </div>
</template>

<script>
import LayoutNotifyVideo from './LayoutNotifyVideo'
import LayoutNotifyInquiry from './LayoutNotifyInquiry'

export default {
  components: {
    LayoutNotifyVideo,
    LayoutNotifyInquiry
  },

  provide() {
    return {
      provideCall: () => this.call
    }
  },

  data() {
    return {
      call: () => {}
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.call = this.$refs.LayoutNotifyVideo.call
    })
  }
}
</script>

<style>
</style>