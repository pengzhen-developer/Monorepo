<template>
  <div id="app">
    <template v-if="useVuePageStack">
      <vue-page-stack>
        <router-view v-bind:key="$route.fullPath" />
      </vue-page-stack>
    </template>
    <template v-else>
      <router-view v-bind:key="$route.fullPath" />
    </template>
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