<template>
  <div>
    <template v-if="errorMessage">
      {{ errorMessage }}
    </template>

    <template v-else>
      <transition appear
                  mode="out-in"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeIn">
        <router-view class="bg-white"></router-view>
      </transition>
    </template>
  </div>
</template>

<script>
import Util from '@src/util'

export default {
  data() {
    return {
      errorMessage: null
    }
  },

  created() {
    // 忽略不需要验证平台的验证

    const routeName = this.$router.name ?? this.$router.history.current.name
    console.log(routeName)
    if (!Util.hybrid.ignorePlatFormRouteNameList.includes(routeName)) {
      // 验证平台来源
      if (!Object.prototype.hasOwnProperty.call(Util.hybrid.platformMap, this.$route.params.platform)) {
        this.errorMessage = '参数验证失败'
      }
    }
  }
}
</script>

<style>
</style>