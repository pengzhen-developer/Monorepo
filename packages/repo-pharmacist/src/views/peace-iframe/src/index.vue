<template>
  <div class="full-width">

    <div v-show="loading"
         class="flex full-width full-height justify-center items-center">
      <q-spinner-tail size="40"
                      color="grey-5"></q-spinner-tail>
    </div>

    <iframe class="iframe"
            ref="iframe"
            width="100%"
            height="100%"
            frameborder="no"
            border="0"
            marginwidth="0"
            marginheight="0"
            allowtransparency="yes"
            v-show="!loading"
            v-bind:src="src"></iframe>
  </div>
</template>

<script>
import { dom } from 'quasar'

export default {
  name: 'PeaceIframe',

  props: {
    ['full']: {
      type: Boolean,
      default() {
        return false
      }
    },

    ['src']: {
      type: String,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
      loading: true
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.setFullStyle()
      this.loadIframeEvent()
    })
  },

  methods: {
    setFullStyle() {
      if (this.full) {
        const offset = dom.offset(this.$el)

        this.$el.style.height = `${document.body.clientHeight - offset?.top}px`
      }
    },

    loadIframeEvent() {
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

<style>
</style>