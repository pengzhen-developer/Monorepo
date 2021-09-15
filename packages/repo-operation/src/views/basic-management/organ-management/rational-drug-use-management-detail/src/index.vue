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
    const custCode = Peace.cache.sessionStorage.get('197-custCode')
    const hospitalName = Peace.cache.sessionStorage.get('197-hospitalName')
    this.src = `${process.env.VUE_APP_SITE_OPERATION}HospitalManage/HospitalIndex?hospitalCode=${custCode}&hospitalName=${hospitalName}`
  }
}
</script>

<style>
</style>