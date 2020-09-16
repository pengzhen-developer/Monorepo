/** 
 * 应用程序拦截器
 * 当作为 '/' 根路由
 * 可控制其所有 children 的访问权限

 * 场景 ：
 * 从 /router/a 跳转 /router/b
 * 触发 beforeRouteEnter
 * 验证 to 是否可访问
 * 跳转 next() 或者 next(vm => vm.$router.push('/redirect'))
 */

<template>
  <router-view />
</template>

<script>
import Util from '@src/util'

export default {
  beforeRouteEnter(to, from, next) {
    console.log('AppIntercept beforeRouteEnter')
    // 验证身份
    if (Util.user.isSignIn()) {
      if (to.path === '/') {
        next('/layout')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  },

  beforeRouteUpdate(to, from, next) {
    console.log('AppIntercept beforeRouteUpdate')

    next()
  }
}
</script>

<style lang="scss" scoped>
</style>