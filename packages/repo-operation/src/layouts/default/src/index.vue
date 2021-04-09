<template>
  <q-layout class="flex"
            view="hHh lpr lFf">

    <q-header reveal
              elevated
              class="bg-primary text-white"
              v-bind:style="{ height: $q.screen.gt.sm ? '80px' : '60px' }">
      <q-toolbar class="full-height q-pl-none">
        <div class="layout-logo full-height text-white q-pt-sm"
             v-bind:style="{
                             ['width']: drawer.width + 'px',
                             ['min-width']: drawer.width + 'px',
                             ['min-width']: drawer.width + 'px',
                             ['background-color']: '#2C8D98'
                           }">
          <LayoutLogo></LayoutLogo>
        </div>

        <div class="flex items-center full-height q-px-md q-pt-sm">
          <q-btn v-bind:disable="!shouldVisibleDrawer"
                 v-on:click="drawer.visible = !drawer.visible"
                 dense
                 flat
                 round
                 icon="menu" />
        </div>

        <div class="flex items-center full-height full-width q-pt-sm overflow-hidden">
          <LayoutHeader></LayoutHeader>
        </div>
      </q-toolbar>
    </q-header>

    <div>
      <q-drawer v-if="shouldVisibleDrawer"
                v-model="drawer.visible"
                v-bind:width="drawer.width"
                v-bind:breakpoint="drawer.breakpoint"
                show-if-above
                side="left"
                elevated>
        <q-scroll-area v-bind:thumb-style="thumbStyle"
                       v-bind:style="scrollAreaStyle">
          <template v-if="drawer.visible && $q.screen.width < drawer.breakpoint - 16">
            <div class="layout-logo text-white q-pt-sm"
                 v-bind:style="{
                                 ['width']: drawer.width + 'px',
                                 ['height']: $q.screen.gt.sm ? '80px' : '60px',
                                 ['min-width']: drawer.width + 'px',
                                 ['min-width']: drawer.width + 'px',
                                 ['background-color']: '#2C8D98'
                               }">
              <LayoutLogo></LayoutLogo>
            </div>
          </template>

          <LayoutSide></LayoutSide>
        </q-scroll-area>
      </q-drawer>
    </div>

    <q-page-container class="col">
      <LayoutTabs v-show="$q.screen.gt.sm"></LayoutTabs>
      <LayoutView></LayoutView>
    </q-page-container>
  </q-layout>

</template>

<script>
import { queryRootNode, queryDeepestNode } from './util'

import obAccount from './observable/ob-account'
import obLayoutTabs from './observable/ob-layout-tabs'
import obLayoutMenu from './observable/ob-layout-menu'

import LayoutHeader from './components/LayoutHeader'
import LayoutLogo from './components/LayoutLogo'
import LayoutSide from './components/LayoutSide'
import LayoutTabs from './components/LayoutTabs'
import LayoutView from './components/LayoutView'

export default {
  components: {
    LayoutHeader,
    LayoutLogo,
    LayoutSide,
    LayoutTabs,
    LayoutView
  },

  provide() {
    return {
      provideAddTab: this.addTab,
      provideGetTab: this.getTab
    }
  },

  data() {
    return {
      drawer: {
        visible: true,
        width: 208,
        breakpoint: 1200
      },

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },

      scrollAreaStyle: {
        height: '100%'
      }
    }
  },

  computed: {
    tab: () => obLayoutTabs.state.tab,
    accountMenu: () => obAccount.state.accountMenu,
    accountMenuTree: () => obAccount.state.accountMenuTree,

    shouldVisibleDrawer: () => {
      const showTopNav = window.configuration.layout.side.showTopNav
      const hasSelectedTopMenu = obLayoutMenu.state.selectedTopMenu?.children?.length > 0

      return showTopNav === false || (showTopNav && hasSelectedTopMenu)
    }
  },

  watch: {
    shouldVisibleDrawer: {
      handler() {
        this.drawer.visible = this.shouldVisibleDrawer
      },
      immediate: true
    },

    $route() {
      // 路由变化，同步更新 tabs
      if (this.$route.meta) {
        obLayoutMenu.mutations.setSelectedNavMenu(this.$route.meta)
        obLayoutTabs.mutations.addTab(this.$route.meta)
        obLayoutTabs.mutations.setTab(this.$route.meta)
      }
    },

    tab(value) {
      if (value.id) {
        // 缓存中存在 tab
        // 还原 tab 选中
        const rootNode = queryRootNode(this.accountMenu, value)
        const rootNodeTree = this.accountMenuTree.find((item) => item.id === rootNode.id)

        obLayoutMenu.mutations.setSelectedTopMenu(rootNodeTree)
        obLayoutMenu.mutations.setSelectedNavMenu(value)

        // 跳转路由
        if (value.menuRoute !== this.$route.fullPath) {
          this.$router.push(value.menuRoute)
        }
      } else {
        // 缓存中不存在 tab
        // 默认首个功能模块
        const deepestNode = queryDeepestNode(this.accountMenuTree)
        obLayoutTabs.mutations.addTab(deepestNode)
        obLayoutTabs.mutations.setTab(deepestNode)
      }
    }
  },

  async created() {
    // layout 初始化, 初始化用户信息
    await obAccount.mutations.getAccountInfo()
    await obAccount.mutations.getAccountMenu()
    await obAccount.mutations.getAccountMenuTree()

    // layout 初始化，从缓存还原标签状态
    obLayoutTabs.mutations.restoreTabs()
    obLayoutTabs.mutations.restoreTab()
  },

  methods: {
    getTab(index) {
      const currentMenu = Peace.util
        .deepClone(obAccount.state.accountMenu)
        .find((menu) => menu.id.toString() === index.toString() || menu.menuAlias.toString() === index.toString())

      return currentMenu
    },

    addTab(tab) {
      obLayoutMenu.mutations.setSelectedNavMenu(tab)
      obLayoutTabs.mutations.addTab(tab)
      obLayoutTabs.mutations.setTab(tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-logo {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

::v-deep .q-layout__shadow:after {
  box-shadow: 0px 1px 8px 0px #e0e0e0;
}
</style> 