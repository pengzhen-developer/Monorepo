<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      useVuePageStack: config.USE_VUE_PAGE_STACK,

      transitionName: 'van-fade'
    }
  }
}
</script>