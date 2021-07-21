<template>
  <div>
    <List v-show="isListView"></List>

    <template v-if="isOrganView">
      <Organ></Organ>
    </template>

    <template v-if="isOperateView">
      <Operate></Operate>
    </template>

    <template v-if="isGoodsView">
      <Goods></Goods>
    </template>

  </div>
</template>

<script>
import Observable from './observable'

import List from './components/List'
import Organ from './components/Organ'
import Operate from './components/Operate'
import Goods from './components/Goods'

export default {
  components: {
    List,
    Organ,
    Operate,
    Goods
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

    isOrganView() {
      return this.view === Observable.constants.view.ORGAN
    },

    isOperateView() {
      return this.view === Observable.constants.view.OPERATE
    },

    isGoodsView() {
      return this.view === Observable.constants.view.GOODS
    }
  },

  beforeRouteLeave(to, from, next) {
    Observable.mutations.changeView(Observable.constants.view.LIST)

    next()
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>