<template>
  <div id="app">
    <Timer></Timer>

    <router-view />
  </div>
</template>

<script>
// 定时任务
import Timer from './timer'

export default {
  components: {
    Timer
  }
}
</script>

<style>
</style>