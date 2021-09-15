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
  name: 'PharmacistChecking',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_OPERATION}Customer/PharmacistCustomer`
  }
}
</script>

<style>
</style>