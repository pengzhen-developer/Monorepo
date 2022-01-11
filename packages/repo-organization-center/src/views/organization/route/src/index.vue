<template>
  <div>
    <div v-show="view === 'OrganizationList'">
      <OrganizationList></OrganizationList>
    </div>

    <div v-if="view === 'RouteList'">
      <RouteList></RouteList>
    </div>
  </div>
</template>

<script>
import obState from './observable/ob-state'

import OrganizationList from './components/OrganizationList.vue'
import RouteList from './components/RouteList.vue'

export default {
  components: {
    OrganizationList,
    RouteList
  },

  data() {
    return {
      model: {}
    }
  },

  computed: {
    view: () => obState.state.view
  }
}
</script>

<style>
</style>