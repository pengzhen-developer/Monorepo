<template>
  <PeaceIframe v-if="show"
               full
               v-bind:src="src"></PeaceIframe>
</template>

<script>
import PeaceIframe from '@src/views/peace-iframe'

export default {
  name: 'PrescriptionCheck',

  components: {
    PeaceIframe
  },

  data() {
    return {
      show: false,
      src: ''
    }
  },

  created() {},
  activated() {
    this.show = true
    let JZTClaimNo = this.$route.query.JZTClaimNo || ''
    Peace.identity.auth.getAuth().then((res) => {
      // 参数 Num 要写在首位，否则.net后端接收不到参数
      this.src = `${process.env.VUE_APP_SITE_PHARMACIST}PharmacistPrescription/startPrescription?Num=${JZTClaimNo}&token=${res.access_token}`
    })
  },
  deactivated() {
    this.show = false
  }
}
</script>

<style>
</style>