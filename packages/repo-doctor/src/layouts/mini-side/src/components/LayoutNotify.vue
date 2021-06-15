<template>
  <div>
    <LayoutNotifyVideo ref="LayoutNotifyVideo"></LayoutNotifyVideo>
    <LayoutNotifyInquiry ref="LayoutNotifyInquiry"></LayoutNotifyInquiry>
    <LayoutNotifyPrescriptionDoubt ref="LayoutNotifyInquiry"></LayoutNotifyPrescriptionDoubt>
    <LayoutNotifyServiceAgreement ref="LayoutNotifyServiceAgreement"></LayoutNotifyServiceAgreement>
    <slot></slot>
  </div>
</template>

<script>
import LayoutNotifyVideo from './LayoutNotifyVideo'
import LayoutNotifyInquiry from './LayoutNotifyInquiry'
import LayoutNotifyPrescriptionDoubt from './LayoutNotifyPrescriptionDoubt'
import LayoutNotifyServiceAgreement from './LayoutNotifyServiceAgreement'

export default {
  components: {
    LayoutNotifyVideo,
    LayoutNotifyInquiry,
    LayoutNotifyPrescriptionDoubt,
    LayoutNotifyServiceAgreement
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

<style></style>
