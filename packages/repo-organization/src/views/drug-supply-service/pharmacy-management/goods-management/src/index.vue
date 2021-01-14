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
  name: 'GoodsManagement',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: '',
      custcode: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_PRESCRIPTION}Pharmacy/Goods`
    if (this.$route.query.custcode) {
      this.custcode = this.$route.query.custcode
      this.src += `?custcode=${this.custcode}`
    }
  }
}
</script>

<style>
</style>