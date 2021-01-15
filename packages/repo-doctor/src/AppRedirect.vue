/** 
 * AppRedirect
 * 
 * 当作为 '/' 根路由
 * 控制跳转
 */

<template>
  <div class="full-width full-height overflow-hidden">
    <q-spinner v-if="showLoading"
               class="absolute-center"
               size="24"
               color="primary"></q-spinner>

    <router-view></router-view>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  data() {
    return {
      showLoading: false
    }
  },

  watch: {
    '$route.path'() {
      if (this.$route.name === 'AppRedirect') {
        this.showLoading = true
      } else {
        this.showLoading = false
      }
    }
  },

  mounted() {
    if (Util.user.isSignIn()) {
      if (this.$route.name !== 'AppIntercept') {
        this.$router.push({ name: 'AppIntercept' })
      }
    } else {
      if (this.$route.name !== 'Login') {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>