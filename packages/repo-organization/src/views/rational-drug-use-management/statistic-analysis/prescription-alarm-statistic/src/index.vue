<template>
  <div class="q-pa-10">
    <iframeContainer ref="iframe"
                     v-bind:src="src"
                     full-height></iframeContainer>
  </div>
</template>

<script>
import iframeContainer from '@src/views/iframe'

export default {
  name: 'PrescriptionAlarmStatistic',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: '',
      prescriptionSource: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_PRESCRIPTION}Engine/Web?uri=statisticalAnalysis/prescripAlarm/prescripAlarm.html`
    if (this.$route.query.prescriptionSource) {
      this.prescriptionSource = this.$route.query.prescriptionSource
      this.src += `?prescriptionSource=${this.prescriptionSource}`
    }
  }
}
</script>

<style>
</style>