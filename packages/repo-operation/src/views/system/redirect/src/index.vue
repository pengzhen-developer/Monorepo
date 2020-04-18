<template>
  <div></div>
</template>

<script>
import RouterPath from '@src/router/routerPath'
import Util from '@src/util'

export default {
  created() {
    // 验证是否已经登录
    const isSignIn = Util.user.isSignIn()

    if (isSignIn) {
      this.$router.push(RouterPath.account.LAYOUT_MANAGER)
    } else {
      this.$router.push(RouterPath.system.LOGIN)
    }
  }
}
</script>

<style>
</style>