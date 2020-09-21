<template>
  <div style="width: 100%; height: 100%;">

    <div v-show="loading"
         class="flex full-width full-height justify-center items-center">
      <q-spinner-tail size="40"
                      color="grey-5"></q-spinner-tail>
    </div>

    <iframe v-show="!loading"
            class="iframe"
            ref="iframe"
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
      loading: true,

      src: ''
    }
  },

  created() {
    this.src = this.$route.meta.menuPath

    if (this.src.indexOf('?') === -1) {
      this.src = this.src + '?sso=true&token=' + Util.user.getUserToken()
    } else {
      this.src = this.src + '&sso=true&token=' + Util.user.getUserToken()
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      const iframe = this.$refs.iframe

      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          // alert('Local iframe is now loaded.')

          this.loading = false
        })
      } else {
        iframe.onload = () => {
          // alert('Local iframe is now loaded.')

          this.loading = false
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>