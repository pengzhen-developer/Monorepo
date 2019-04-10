<template>
  <el-tabs @tab-click="tabClick" class="tabs" v-model="layout.selectTab">
    <el-tab-pane
      :closable="tab.closable"
      :key="tab.name"
      :label="tab.name"
      :name="tab.path"
      v-for="tab in layout.tabList"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['layout'])
  },

  methods: {
    ...mapActions('layout', ['selectTab', 'pushTab', 'unshiftTab', 'removeTab', 'clearTab']),

    tabClick(tab) {
      this.defaultActive = tab.name

      this.selectTab(tab.name)

      this.$router.push(tab.name)
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
    font-size: 12px;
    padding: 0 20px !important;

    /deep/ .el-icon-close {
      font-size: 10px;
      color: #d1d1d1;
      position: relative;
      top: -4px;
      left: 4px;
    }
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
