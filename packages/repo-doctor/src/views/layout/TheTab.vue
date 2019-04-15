<template>
  <el-tabs @tab-click="tabClick" @tab-remove="tabRemove" class="tabs" v-model="layout.selectTab">
    <el-tab-pane
      :closable="tab.closable"
      :key="tab.path"
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

  watch: {
    'layout.tabList'(val) {
      $peace.cache.set('LAYOUT_LIST', val, 'sessionStorage')
    }
  },

  mounted() {
    this.layout.tabList = $peace.cache.get('LAYOUT_LIST', 'sessionStorage') || this.layout.tabList
  },

  methods: {
    ...mapActions('layout', ['selectTab', 'pushTab', 'unshiftTab', 'removeTab', 'clearTab']),

    tabClick(tab) {
      this.defaultActive = tab.name

      this.selectTab(tab.name)

      this.$router.push(tab.name)
    },

    tabRemove(name) {
      const index = this.layout.tabList.findIndex(item => item.path === name)
      this.removeTab(name)

      const nextTab = Object.assign({}, this.layout.tabList[index - 1])
      nextTab.name = nextTab.path

      this.tabClick(nextTab)
    },

    tabClear() {
      this.clearTab()

      if (this.layout.tabList.length === 0) {
        this.$router.push('/')
      } else {
        const nextTab = Object.assign({}, this.layout.tabList[0])
        nextTab.name = nextTab.path

        this.tabClick(nextTab)
      }
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
