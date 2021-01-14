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
  name: 'PrescriptionCheckingVerify',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_PRESCRIPTION}Engine/Web?uri=statisticalAnalysis/prescriptionVerification/prescriptionVerification.html`
  }
}
</script>

<style>
</style>