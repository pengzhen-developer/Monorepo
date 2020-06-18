<template>
  <div class="myRecordDetail">
    <iframe id='myRecordDetail'
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
      src: '',
      token: $peace.cache.get($peace.type.USER.INFO).loginInfo.accessToken
    }
  },
  activated() {
    const params = peace.util.decode(this.$route.params.json)
    this.src = `${process.env.VUE_APP_IFRAME_BASE_URL}hybrid/health/${params.type}/${process.env.VUE_APP_IFRAME_BASE_PLATFORM}/${this.token}/${params.checkId}`
  }
}
</script>

<style>
.myRecordDetail {
  height: 100%;
}
</style>