<template>
  <div id="app"
       class="window-width window-height overflow-hidden">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    Peace.http.defaults.headers.common['token'] = 'd9cb0c6117884ba5aea5fdfdb9e7d77b'
  },

}
</script>

<style lang="scss">
</style>
