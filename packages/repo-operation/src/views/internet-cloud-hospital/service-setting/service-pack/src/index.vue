<template>
  <div>
    <ServicePackList v-show="isListView"></ServicePackList>

    <template v-if="isAddView">
      <ServicePackAdd></ServicePackAdd>
    </template>

    <template v-if="isEditView">
      <ServicePackEdit></ServicePackEdit>
    </template>

    <template v-if="isDetailView">
      <ServicePackDetail></ServicePackDetail>
    </template>

  </div>
</template>

<script>
import ServicePackList from './components/ServicePackList'
import ServicePackAdd from './components/ServicePackAdd'
import ServicePackEdit from './components/ServicePackEdit'
import ServicePackDetail from './components/ServicePackDetail'

import Observable from './observable'

export default {
  name: 'ServicePack',

  components: {
    ServicePackList,
    ServicePackAdd,
    ServicePackEdit,
    ServicePackDetail
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

    isAddView() {
      return this.view === Observable.constants.view.ADD
    },

    isEditView() {
      return this.view === Observable.constants.view.EDIT
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