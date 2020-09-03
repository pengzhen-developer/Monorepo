<template>
  <div id="app">
    <Timer></Timer>

    <router-view />
  </div>
</template>

<script>
import Timer from './timer'

export default {
  components: {
    Timer
  },

  created() {}
}
</script>

<style>
</style>