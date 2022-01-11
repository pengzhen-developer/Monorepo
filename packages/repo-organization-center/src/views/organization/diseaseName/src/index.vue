<template>
  <div>
    <div v-show="view === 'OrganizationList'">
      <OrganizationList></OrganizationList>
    </div>

    <div v-if="view === 'DiseaseList'">
      <DiseaseList></DiseaseList>
    </div>
  </div>
</template>

<script>
import obState from './observable/ob-state'

import OrganizationList from './components/OrganizationList.vue'
import DiseaseList from './components/DiseaseList.vue'

export default {
  components: {
    OrganizationList,
    DiseaseList
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