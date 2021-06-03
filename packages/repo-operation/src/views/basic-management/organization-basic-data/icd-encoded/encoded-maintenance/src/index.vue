// 配码维护

<template>
  <div class="layout-route full-width flex">
    <MainList v-on:onItemsClick="onItemsClick"
              v-if="!showManageList"></MainList>
    <SubList v-bind:info="currentInfo"
             v-on:onBack="onBack"
             v-else></SubList>
  </div>
</template>

<script>
import SubList from './components/SubList'
import MainList from './components/MainList'
export default {
  name: 'EncodedMaintenance',
  components: { SubList, MainList },
  data() {
    return {
      showManageList: false,
      currentInfo: {}
    }
  },
  methods: {
    onItemsClick(data) {
      this.showManageList = true
      this.currentInfo = Object.assign({}, data)
    },
    onBack() {
      this.showManageList = false
      this.currentInfo = {}
    }
  },
  beforeRouteLeave(to, from, next) {
    this.showManageList = false
    next()
  }
}
</script>

<style>
</style>