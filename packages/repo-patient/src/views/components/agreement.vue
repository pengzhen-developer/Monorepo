<template>
  <div class="myAgreement">
    <iframe id='myAgreement'
            :src="src"
            width="100%"
            height="100%"
            frameborder=0></iframe>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      src: ''
    }
  },
  activated() {
    console.log(process.env)
    const params = peace.util.decode(this.$route.params.json)
    this.src = `${process.env.VUE_APP_IFRAME_BASE_URL}hybrid/agreements/${params.type}/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}`
  }
}
</script>

<style>
.myAgreement {
  height: 100%;
}
</style>