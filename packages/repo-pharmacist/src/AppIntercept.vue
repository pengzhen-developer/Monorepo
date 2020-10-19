/** 
 * AppIntercept
 * 应用程序拦截器
 * 做为权限的动态路由 root component
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
export default {
  beforeRouteEnter(to, from, next) {
    if (Peace.identity.auth.isLogin()) {
      if (to.path === '/AppIntercept') {
        next((vm) => vm.$router.replace({ name: 'Layout' }))
      } else {
        next()
      }
    } else {
      next((vm) => vm.$router.replace({ name: 'Login' }))
    }
  },

  beforeRouteUpdate(to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>