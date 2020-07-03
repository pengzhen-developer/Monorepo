<template>
  <div style="width: 100%; height: 100%;">
    <iframe class="iframe"
            v-bind:src="src"
            width="100%"
            height="100%"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            allowtransparency="yes"></iframe>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = this.$route.meta.menuPath

    if (this.src.indexOf('?') === -1) {
      this.src = this.src + '?cdkey=' + Util.user.getUserCDKey()
    } else {
      this.src = this.src + '&cdkey=' + Util.user.getUserCDKey()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>