<template>
  <div class="layout-route full-width flex">
    <SheetList v-show="showList"
               v-on:onOrderClick="onOrderClick"></SheetList>
    <SheetDetail v-if="!showList"
                 v-bind:data="data"
                 v-on:onBack="onBack"></SheetDetail>
  </div>
</template>

<script>
import SheetList from './components/SheetList'
import SheetDetail from './components/SheetDetail'
export default {
  name: 'InspectionSheet',
  components: { SheetList, SheetDetail },
  data() {
    return {
      showList: true,
      data: ''
    }
  },
  methods: {
    onOrderClick(data) {
      this.showList = false
      this.data = data
    },
    onBack() {
      this.showList = true
    }
  },
  beforeRouteLeave(to, from, next) {
    this.showList = true
    next()
  }
}
</script>

<style>
</style>