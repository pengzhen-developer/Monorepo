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
      this.showLoading = this.$route.name === 'AppRedirect';
    }
  },

  mounted() {
    if (this.$route.name !== 'AppIntercept') {
      this.$router.push({ name: 'AppIntercept' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
