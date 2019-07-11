<template>
  <div id="app">
    <transition mode="out-in" name="van-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'app',

  created() {
    document.title = peace.config.system.title

    // restore user info and user token
    if (peace.cache.get(peace.type.USER.INFO)) {
      this.$store.commit('user/restoreUserInfo', peace.cache.get(peace.type.USER.INFO))

      peace.service.IM.initNIM()
    }
  }
}
</script>

<style>
</style>

