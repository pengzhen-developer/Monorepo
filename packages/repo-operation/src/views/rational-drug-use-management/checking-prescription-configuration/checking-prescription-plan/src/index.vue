<template>
  <div class="q-pa-6">
    <iframeContainer ref="iframe"
                     v-bind:src="src"
                     full-height></iframeContainer>
  </div>
</template>

<script>
import iframeContainer from '@src/views/iframe'

export default {
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    const hospitalCode = Peace.cache.sessionStorage.get('242-hospitalCode')
    const hospitalName = Peace.cache.sessionStorage.get('242-hospitalName')
    this.src = `${process.env.VUE_APP_SITE_OPERATION}PrescriptionProject/ProjectListZyy?hospitalCode=${hospitalCode}&hospitalName=${hospitalName}`
  }
}
</script>

<style>
</style>