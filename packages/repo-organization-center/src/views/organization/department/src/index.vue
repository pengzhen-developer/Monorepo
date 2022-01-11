<template>
  <div>
    <div v-show="view === 'OrganizationList'">
      <OrganizationList></OrganizationList>
    </div>

    <div v-if="view === 'DepartmentList'">
      <DepartmentList></DepartmentList>
    </div>
  </div>
</template>

<script>
import obState from './observable/ob-state'

import OrganizationList from './components/OrganizationList.vue'
import DepartmentList from './components/DepartmentList.vue'

export default {
  components: {
    OrganizationList,
    DepartmentList
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