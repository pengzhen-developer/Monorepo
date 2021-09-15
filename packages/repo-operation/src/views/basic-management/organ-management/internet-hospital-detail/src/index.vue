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
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    const hospitalId = Peace.cache.sessionStorage.get('196-hospitalId')
    this.src = `${process.env.VUE_APP_SITE_NETHOSPITAL}/organization/details/${hospitalId}`
  }
}
</script>

<style>
</style>