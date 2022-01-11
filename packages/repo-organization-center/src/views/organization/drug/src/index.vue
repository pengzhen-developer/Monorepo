<template>
  <div>
    <div v-show="view === 'OrganizationList'">
      <OrganizationList></OrganizationList>
    </div>

    <div v-if="view === 'DrugList'">
      <DrugList></DrugList>
    </div>
  </div>
</template>

<script>
import obState from './observable/ob-state'

import OrganizationList from './components/OrganizationList.vue'
import DrugList from './components/DrugList.vue'

export default {
  components: {
    OrganizationList,
    DrugList
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