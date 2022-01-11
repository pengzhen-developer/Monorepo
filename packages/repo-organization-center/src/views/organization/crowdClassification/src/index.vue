<template>
  <div>
    <div v-show="view === 'OrganizationList'">
      <OrganizationList></OrganizationList>
    </div>

    <div v-if="view === 'CrowdClassificationList'">
      <CrowdClassificationList></CrowdClassificationList>
    </div>
  </div>
</template>

<script>
import obState from './observable/ob-state'

import OrganizationList from './components/OrganizationList.vue'
import CrowdClassificationList from './components/CrowdClassificationList.vue'

export default {
  components: {
    OrganizationList,
    CrowdClassificationList
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