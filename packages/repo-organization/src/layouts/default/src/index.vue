<template>
  <q-layout class="layout"
            view="hHh lpR lFf">

    <q-header class="layout-header bg-white text-grey-7 q-mb-xs">
      <LayoutHeader></LayoutHeader>
    </q-header>

    <q-drawer class="layout-drawer"
              side="left"
              show-if-above
              v-bind:width="240"
              v-bind:breakpoint="0"
              v-model="showDrawerModel">
      <LayoutNav></LayoutNav>

      <div class="q-mini-drawer-hide absolute-center"
           style="left: unset; right: -24px;"
           v-on:click="toggleDrawer">

        <q-btn class="bg-grey-4"
               style="width: 16px; height: 128px; border-radius: 5px 128px 128px 5px;"
               flat
               v-bind:ripple="false">
          <q-icon class="absolute text-grey-6"
                  style="left: -4px;"
                  v-bind:name="showDrawerModel ? 'chevron_left' : 'chevron_right'"></q-icon>
        </q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="bg-grey-1">
        <LayoutTabs class="bg-white"></LayoutTabs>
        <LayoutView class="bg-grey-2"></LayoutView>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Peace from '@src/library'

/** 布局 - 顶部 */
import LayoutHeader from './components/LayoutHeader'
/** 布局 - 左侧导航 */
import LayoutNav from './components/LayoutNav'
/** 布局 - 已打开功能标签 */
import LayoutTabs from './components/LayoutTabs'
/** 布局 - 已打开功能 */
import LayoutView from './components/LayoutView'

export default {
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutTabs,
    LayoutView
  },

  provide() {
    return {
      // provide function
      provideToggleDrawer: this.toggleDrawer,
      provdeMenuSelect: this.menuSelect,

      // provide property
      // provide function for computed
      provideMenuList: () => this.menuList,
      provideMenuTree: () => this.menuTree
    }
  },

  data() {
    return {
      configuration: window.configuration,
      menuList: [],
      menuTree: [],

      showDrawerModel: true
    }
  },

  created() {
    this.getMenu()
  },

  methods: {
    getMenu() {
      // 避免浅拷贝导致数据源被污染
      const menuListSource = Peace.util.deepClone(this.configuration.routes.layoutNavMenu)
      const menuTreeSource = Peace.util.deepClone(this.configuration.routes.layoutNavMenu)

      this.menuList = menuListSource
      this.menuTree = Peace.util.arrayToTree(menuTreeSource, 'id', 'parentId')
    },

    toggleDrawer(state) {
      if (Peace.util.type(state).isBoolean) {
        this.showDrawerModel = state
      } else {
        this.showDrawerModel = !this.showDrawerModel
      }
    },

    menuSelect(index) {
      const currentMenu = this.menuList.find((menu) => menu.id === index)

      setImmediate(() => {
        // 新增到当前 tab
        this.$store.commit('tabs/addTab', currentMenu)
        // 选中当前 tab
        this.$store.commit('tabs/selectTab', currentMenu)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  max-width: 1920px;
  margin: 0 auto;

  .layout-header {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }

  .layout-drawer {
    ::v-deep .q-drawer {
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    }

    ::v-deep .q-layout--prevent-focus {
      visibility: visible;
    }
  }
}
</style>