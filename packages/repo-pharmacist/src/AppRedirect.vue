/** 
 * AppRedirect
 * 
 * 当作为 '/' 根路由
 * 控制跳转
 */

<template>
  <div class="absolute-center">
    <q-spinner size="24"
               color="primary"></q-spinner>
  </div>
</template>

<script>
export default {
  mounted() {
    if (Peace.identity.auth.isLogin) {
      this.$router.push({ name: 'AppIntercept' })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>