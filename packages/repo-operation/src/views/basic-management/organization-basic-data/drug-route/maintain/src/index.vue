<template>
  <div>
    <Main v-show="isListView"></Main>

    <template v-if="isDetailView">
      <Management></Management>
    </template>

  </div>
</template>

<script>
import Main from './components/Main'
import Management from './components/Management'

import Observable from './observable'

export default {
  name: 'RouteMaintain',

  components: {
    Main,
    Management
  },

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