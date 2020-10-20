/** 
 * AppRedirect
 * 
 * 当作为 '/' 根路由
 * 控制跳转
 */

<template>
  <div class="window-width window-height overflow-hidden">
    <q-spinner v-if="showLoading"
               class="absolute-center"
               size="24"
               color="primary"></q-spinner>

    <router-view></router-view>
  </div>
</template>

<script>
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
    if (Peace.identity.auth.isLogin()) {
      if (this.$route.path !== '/AppIntercept') {
        this.$router.push({ name: 'AppIntercept' })
      }
    } else {
      if (this.$route.path !== '/login') {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>