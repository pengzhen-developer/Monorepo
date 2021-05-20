

// 编码配码

<template>
  <div class="layout-route full-width flex">
    <MainList @onItemsClick="onItemsClick"
              v-if="!showManageList"></MainList>
    <SubList :info="currentInfo"
             @onBack="onBack"
             v-else></SubList>
  </div>
</template>

<script>
import SubList from './components/SubList'
import MainList from './components/MainList'
export default {
  name: 'ClassificationMatch',
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
  }
}
</script>

<style>
</style>