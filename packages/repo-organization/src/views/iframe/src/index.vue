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
            v-bind:src="iframeUrl"
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
export default {
  props: {
    ['src']: String,
    ['full-height']: Boolean
  },

  data() {
    return {
      loading: true,
      internalSrc: '',
      iframeUrl: ''
    }
  },

  watch: {
    src() {
      this.loading = true
      this.internalSrc = this.src
    },

    async internalSrc() {
      const auth = await Peace.identity.auth.getAuth()
      const token = auth.access_token

      if (this.internalSrc.indexOf('?') === -1) {
        this.iframeUrl = this.internalSrc + '?sso=true&token=' + token
      } else {
        this.iframeUrl = this.internalSrc + '&sso=true&token=' + token
      }
    }
  },

  created() {
    if (this.src) {
      this.internalSrc = this.src
    } else {
      this.internalSrc = this.$route.meta.menuPath
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.initEvent()
    })
  },

  methods: {
    initEvent() {
      const iframe = this.$refs.iframe

      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.loading = false
        })
      } else {
        iframe.onload = () => {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>