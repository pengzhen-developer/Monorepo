<template>
  <div class="q-pl-20 q-pr-20 q-pt-20">
    <iframeContainer ref="iframe"
                     v-bind:src="src"
                     full-height></iframeContainer>
  </div>
</template>

<script>
import iframeContainer from '@src/views/iframe'

export default {
  name: 'AdministrationFrequency',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_OPERATION}DrugData/Frequency`
  }
}
</script>

<style>
</style>