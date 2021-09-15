<template>
  <div class="layout-route full-width flex">
    <OrganList v-show="isListView"></OrganList>
    <template v-if="isAddView">
      <ServiceAgreement></ServiceAgreement>
    </template>
    <template v-if="isDetailView">
      <SignedList></SignedList>
    </template>
  </div>
</template>

<script>
import OrganList from './components/OrganList'
import ServiceAgreement from './components/ServiceAgreement'
import SignedList from './components/SignedList'

import Observable from './observable'
export default {
  name: 'organization-list',
  components: {
    OrganList,
    ServiceAgreement,
    SignedList
  },
  computed: {
    view() {
      return Observable.state.view
    },
    isListView() {
      return this.view === Observable.constants.view.LIST
    },

    isAddView() {
      return this.view === Observable.constants.view.ADD
    },

    isDetailView() {
      return this.view === Observable.constants.view.DETAIL
    }
  },
  beforeRouteLeave(to, from, next) {
    Observable.mutations.changeView(Observable.constants.view.LIST)

    next()
  }
}
</script>

<style>
</style>