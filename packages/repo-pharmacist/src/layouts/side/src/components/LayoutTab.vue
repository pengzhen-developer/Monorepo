<template>
  <div class="flex items-center full-width bg-white">
    <el-tabs class="layout-tabs"
             v-model="tabActive"
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
/*eslint no-prototype-builtins: "off"*/
import Observable_Layout from './../observable'

export default {
  data() {
    return {
      tabActive: ''
    }
  },

  computed: {
    tabs: () => Observable_Layout.state.tabs,
    tab: () => Observable_Layout.state.tab
  },

  watch: {
    '$route.path'() {
      if (this.$route.meta && this.$route.meta.id !== this.tab.id) {
        Observable_Layout.mutations.setTab(this.$route.meta)
      }
    },

    tab: {
      handler() {
        if (this.tab.id) {
          this.tabActive = this.tab.id

          this.pushRoute(this.tab)
        }
      },
      immediate: true
    }
  },

  methods: {
    pushRoute(tab) {
      const routePath = tab.menuRoute
      const realPath = tab.menuPath

      if (this.$route.path !== routePath) {
        this.$router.push(routePath).then((route) => {
          /** 动态修改 route meta */
          for (const key in route.meta) {
            if (route.meta.hasOwnProperty(key)) {
              route.meta[key] = tab[key]
            }
          }
        })
      }

      // Fixed iFrame parameter lost
      if (Peace.validate.isUrl(realPath)) {
        this.$router.push({ path: routePath, query: { t: Date.now() } }).then((route) => {
          /** 动态修改 route meta */
          for (const key in route.meta) {
            if (route.meta.hasOwnProperty(key)) {
              route.meta[key] = tab[key]
            }
          }
        })
      }
    },

    tabClick(tabComponent) {
      const tab = this.tabs.find((item) => item.id === tabComponent.name)

      Observable_Layout.mutations.setTab(tab)
    },

    tabRemove(id) {
      const tab = this.tabs.find((item) => item.id === id)
      Observable_Layout.mutations.removeTab(tab)

      const lastTab = this.tabs[this.tabs.length - 1]
      Observable_Layout.mutations.setTab(lastTab)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-tabs {
  height: 40px;
  width: 100%;

  ::v-deep .el-tabs__header {
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