<template>
  <div>
    <div class="container"
         v-text="text"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '就开始的垃圾法拉盛地方就开始的垃方'
    }
  },

  watch: {
    text: {
      handler() {
        this.$nextTick().then(() => {
          const dom = this.$el.querySelector('.container')

          if (dom.offsetHeight >= 25) {
            dom.classList.add('ellipsis')
            dom.title = this.text
          }
        })
      },
      immediate: true
    }
  },

  created() {
    window.addEventListener('resize', this.method)
  },

  destroyed() {
    window.removeEventListener('resize', this.method)
  }
}
</script>

<style>
</style>