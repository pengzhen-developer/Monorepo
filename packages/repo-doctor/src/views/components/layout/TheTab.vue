<template>
  <el-tabs @tab-click="tabClick" @tab-remove="tabRemove" class="tabs" v-model="$store.state.layout.currentTab">
    <el-tab-pane :closable="tab.closable" :key="tab.path" :label="tab.title" :name="tab.path" v-for="tab in $store.state.layout.tabList"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  methods: {
    tabClick(tab) {
      this.$store.commit('layout/selectTab', tab.name)

      if (this.$route.path !== tab.name) {
        this.$router.push(tab.name)
      }
    },

    tabRemove(name) {
      const index = this.$store.state.layout.tabList.findIndex(item => item.path === name)

      if (name === this.$store.state.layout.currentTab) {
        const nextTab = Object.assign({}, this.$store.state.layout.tabList[index - 1])
        nextTab.name = nextTab.path
        this.tabClick(nextTab)
      }

      this.$store.commit('layout/removeTab', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);

  /deep/ .el-tabs__item {
    font-size: 14px;
    padding: 0 20px !important;

    /deep/ .el-icon-close {
      font-size: 10px;
      color: #d1d1d1;
      position: relative;
      top: -4px;
      left: 4px;
    }
  }

  /deep/ .el-tabs__nav-next,
  /deep/ .el-tabs__nav-prev {
    line-height: 40px;
  }

  /deep/ .el-tabs__active-bar {
    display: none;
  }

  /deep/ .el-tabs__item::after {
    content: '';
    position: absolute;
    right: 0;
    top: 9px;
    bottom: 0;
    width: 1px;
    height: 23px;
    background-color: #efefef;
    z-index: 1;
  }

  /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
