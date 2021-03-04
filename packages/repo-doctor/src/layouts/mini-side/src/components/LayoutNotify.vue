<template>
  <div>
    <LayoutNotifyVideo ref="LayoutNotifyVideo"></LayoutNotifyVideo>
    <LayoutNotifyInquiry ref="LayoutNotifyInquiry"></LayoutNotifyInquiry>
    <LayoutNotifyPrescriptionDoubt ref="LayoutNotifyInquiry"></LayoutNotifyPrescriptionDoubt>
    <slot></slot>
  </div>
</template>

<script>
import LayoutNotifyVideo from './LayoutNotifyVideo'
import LayoutNotifyInquiry from './LayoutNotifyInquiry'
import LayoutNotifyPrescriptionDoubt from './LayoutNotifyPrescriptionDoubt'

export default {
  components: {
    LayoutNotifyVideo,
    LayoutNotifyInquiry,
    LayoutNotifyPrescriptionDoubt
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