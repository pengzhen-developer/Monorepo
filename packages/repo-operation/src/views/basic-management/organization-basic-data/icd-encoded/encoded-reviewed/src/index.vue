<template>
  <div class="layout-route full-width flex">

    <MainList v-show="isListView"></MainList>

    <template v-if="isDetailView">
      <SubList></SubList>
    </template>

  </div>
</template>

<script>
import SubList from './components/SubList'
import MainList from './components/MainList'

import Observable from './observable'

export default {
  name: 'EncodedReviewed',
  components: { SubList, MainList },
  data() {
    return {}
  },

  computed: {
    view() {
      return Observable.state.view
    },

    isListView() {
      return this.view === Observable.constants.view.LIST
    },

    isDetailView() {
      return this.view === Observable.constants.view.DETAIL
    }
  },

  beforeRouteLeave(to, from, next) {
    Observable.mutations.changeView(Observable.constants.view.LIST)

    next()
  },

  methods: {
    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style>
</style>