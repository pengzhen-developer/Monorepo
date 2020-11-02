<template>
  <q-layout class="layout"
            view="hHh lpR lFf">

    <q-header class="layout-header bg-white q-mb-xs">
      <LayoutHeader></LayoutHeader>
    </q-header>

    <q-drawer class="layout-drawer"
              side="left"
              show-if-above
              v-bind:width="240"
              v-bind:breakpoint="0"
              v-model="showDrawerModel">
      <LayoutNav v-bind:defaultActive="defaultActive"></LayoutNav>

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
import Util from '@src/util'

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

      provideGetTab: this.getTab,
      provideAddTab: this.addTab,

      // provide property
      // provide function for computed
      provideMenuList: () => this.menuList,
      provideMenuTree: () => this.menuTree
    }
  },
  watch: {
    // 路由更新，还原 nav
    '$route.path'() {
      this.$nextTick().then(() => {
        this.resetNavSelect()
      })
    }
  },
  data() {
    return {
      configuration: window.configuration,
      menuList: [],
      menuTree: [],

      showDrawerModel: true,
      defaultActive: ''
    }
  },

  created() {
    this.getMenu()
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.$route.fullPath !== '/layout') {
        this.resetActive()
      } else {
        // 默认选中第一个
        const firstMenuNode = this.$el.querySelector(`.q-drawer li.el-menu-item:not(.is-disabled)`)
        firstMenuNode?.click()
      }
    })
  },

  methods: {
    getMenu() {
      // 避免浅拷贝导致数据源被污染
      const menuListSource = Peace.util.deepClone(Util.user.getAccountMenuList()).filter((item) => !item.virtual)
      const menuTreeSource = Peace.util.deepClone(Util.user.getAccountMenuList()).filter((item) => !item.virtual)

      this.menuList = menuListSource
      const tree = Peace.util.arrayToTree(menuTreeSource, 'id', 'parentId')
      this.menuTree = tree
    },

    toggleDrawer(state) {
      if (Peace.util.isType(state).isBoolean) {
        this.showDrawerModel = state
      } else {
        this.showDrawerModel = !this.showDrawerModel
      }
    },

    getTab(index) {
      const menuListSource = Peace.util.deepClone(Util.user.getAccountMenuList())

      const currentMenu = menuListSource.find((menu) => menu.id.toString() === index.toString() || menu.menuAlias.toString() === index.toString())

      return currentMenu
    },

    addTab(tab) {
      // 新增到当前 tab
      this.$store.commit('tabs/addTab', tab)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', tab)
    },

    menuSelect(index) {
      const currentMenu = this.menuList.find((menu) => menu.id === index)

      // 新增到当前 tab
      this.$store.commit('tabs/addTab', currentMenu)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', currentMenu)
    },

    resetNavSelect() {
      // 初始化进入？ 默认选中第一项
      if (this.$route.path === '/layout') {
        const firstMenuNode = this.$el.querySelector(`li.el-menu-item:not(.is-disabled)`)

        firstMenuNode?.click()
      }

      // 页面被刷新？ 恢复菜单选中
      else if (this.$route.path && this.$route.name) {
        this.resetActive()
      }
    },

    resetActive() {
      const router = this.$route?.meta

      //还原 nav active
      this.defaultActive = router?.id.toString()

      //还原 tabs active
      this.$store.commit('tabs/selectTab', router)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
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