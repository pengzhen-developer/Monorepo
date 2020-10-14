<template>
  <PeaceIframe full
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
      src: ''
    }
  },

  created() {
    Peace.identity.auth.getAuth().then((res) => {
      this.src = `${process.env.VUE_APP_SITE_BASE}PharmacistPrescription/startPrescription?token=${res.access_token}`
    })
  }
}
</script>

<style>
</style>