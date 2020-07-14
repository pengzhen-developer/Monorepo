<template>
  <div class="flex items-center full-width">
    <el-tabs class="layout-tabs"
             v-model="active"
             v-on:tab-click="tabClick"
             v-on:tab-remove="tabRemove">
      <el-tab-pane v-for="tab in tabs"
                   v-bind:key="tab.id"
                   v-bind:name="tab.id"
                   v-bind:label="tab.menuName"
                   v-bind:closable="tabs.length > 1 && tab.closable">

      </el-tab-pane>

      <q-popup-proxy context-menu>
        <q-banner>
          <template v-slot:avatar>
            <q-icon name="signal_wifi_off"
                    color="primary" />
          </template>
          You have lost connection to the internet. This app is offline.
        </q-banner>
      </q-popup-proxy>
    </el-tabs>
  </div>
</template>

<script>
import Peace from '@src/library'

export default {
  data() {
    return {
      active: null
    }
  },

  computed: {
    tabs: {
      get() {
        return this.$store.state.tabs.tabs
      },
      set(value) {
        this.$store.commit('tabs/setTabs', value)
      }
    },

    activeTab() {
      return this.$store.state.tabs.activeTab
    }
  },

  watch: {
    tabs() {
      // tab 有改变，缓存
      Peace.cache.sessionStorage.set('tabs', this.tabs)
    },

    activeTab() {
      // 选中 tab
      this.active = this.activeTab.id

      // 更改 route
      this.changeRoute(this.activeTab)
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      // 页面被刷新？ 恢复 tabs
      this.tabs = Peace.cache.sessionStorage.get('tabs') ?? []
    })
  },

  methods: {
    changeRoute(tab) {
      const routePath = '/layout/' + tab.menuRoute

      if (this.$route.path !== routePath) {
        this.$router.push(routePath).then((route) => {
          /** 动态修改 route meta */

          /* eslint-disable */
          for (const key in route.meta) {
            if (route.meta.hasOwnProperty(key)) {
              route.meta[key] = tab[key]
            }
          }
        })
      }
    },

    tabClick(tab) {
      if (tab.name === this.activeTab.id) {
        // 重复点击
        return
      }

      const currentTab = this.tabs.find((item) => item.id === tab.name)
      this.$store.commit('tabs/selectTab', currentTab)
    },

    tabRemove(id) {
      // 删除当前 tab
      const currentTab = this.tabs.find((item) => item.id === id)
      this.$store.commit('tabs/removeTab', currentTab)

      // 选中最后 tab
      if (this.tabs.length > 0) {
        const lastTab = this.tabs[this.tabs.length - 1]
        this.$store.commit('tabs/selectTab', lastTab)
      }
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