<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',

  created() {
    // restore info
    if ($peace.cache.get('USER')) {
      this.restoreUserInfo()
    }
  },

  methods: {
    ...mapActions('user', ['restoreUserInfo'])
  }
}
</script>


<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;

  margin: 0 auto;

  overflow: hidden;
}
</style>
