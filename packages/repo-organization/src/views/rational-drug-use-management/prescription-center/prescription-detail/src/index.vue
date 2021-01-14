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
  name: 'PrescriptionDetail',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: '',
      JZTClaimNo: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_PRESCRIPTION}Pharmacy/Prescriptiondetails`
    if (this.$route.query.JZTClaimNo) {
      this.JZTClaimNo = this.$route.query.JZTClaimNo
      this.src += `?JZTClaimNo=${this.JZTClaimNo}`
    }
  }
}
</script>

<style>
</style>