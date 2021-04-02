<template>
  <div class="flex items-center full-width bg-white">
    <el-tabs class="layout-tabs element-ui-default"
             v-bind:value="tab.id"
             v-on:tab-click="tabClick"
             v-on:tab-remove="tabRemove">
      <el-tab-pane v-for="tab in tabs"
                   v-bind:key="tab.id"
                   v-bind:name="tab.id"
                   v-bind:label="tab.menuName"
                   v-bind:closable="tabs.length > 1 && tab.closable">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import obLayoutTabs from './../observable/ob-layout-tabs'

export default {
  data() {
    return {}
  },

  computed: {
    tabs: () => obLayoutTabs.state.tabs,
    tab: () => obLayoutTabs.state.tab
  },

  methods: {
    tabClick(tabComponent) {
      const tab = this.tabs.find((item) => item.id === tabComponent.name)

      obLayoutTabs.mutations.setTab(tab)
    },

    tabRemove(id) {
      const tab = this.tabs.find((item) => item.id === id)
      obLayoutTabs.mutations.removeTab(tab)

      const lastTab = this.tabs[this.tabs.length - 1]
      obLayoutTabs.mutations.setTab(lastTab)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-tabs {
  height: 40px;
  width: 100%;

  .el-tabs__header {
    margin: 0;

    .el-tabs__item {
      font-size: 14px;
      padding: 0 20px !important;

      .el-icon-close {
        font-size: 10px;
        color: #d1d1d1;
        position: relative;
        top: -4px;
        left: 4px;
      }
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 40px;
    }

    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item::after {
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

    .el-tabs__nav-wrap::after {
      height: 1px;
    }
  }
}
</style>