<template>
  <q-layout class="layout"
            view="hHh lpR lFf">

    <q-header class="layout-header ">
      <LayoutHeader class="layout-header-content"
                    v-bind:defaultActive="defaultHeanderNavActive"></LayoutHeader>
    </q-header>

    <q-drawer class="layout-drawer"
              side="left"
              show-if-above
              v-if="hasNavMenu"
              v-bind:width="240"
              v-bind:breakpoint="0"
              v-model="showDrawerModel">
      <LayoutNav v-bind:defaultActive="defaultDrawerNavActive"></LayoutNav>

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
        <LayoutTabs></LayoutTabs>
        <LayoutView></LayoutView>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
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
      provdeParentMenuSelect: this.parentMenuSelect,
      provdeMenuSelect: this.menuSelect,
      provideAddTab: this.addTab,
      provideGetTab: this.getTab,

      // provide property
      // provide function for computed
      provideMenuList: () => this.menuList,
      provideMenuTree: () => this.menuTree,
      provideChildrenMenuTree: () => this.childrenMenuTree
    }
  },

  data() {
    return {
      configuration: window.configuration,
      menuList: [],
      menuTree: [],
      childrenMenuTree: [],

      defaultHeanderNavActive: '',
      defaultDrawerNavActive: '',

      showDrawerModel: true
    }
  },

  watch: {
    // 当路由发生变化，还原顶部菜单及导航菜单选中
    '$route.path': {
      handler() {
        this.resetActive()
      }
    }
  },

  computed: {
    hasNavMenu() {
      console.log('childrenMenuTree', this.childrenMenuTree)
      return this.childrenMenuTree?.length > 0
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
        const firstMenuNode = this.$el.querySelector(`.q-header li.el-menu-item:not(.is-disabled)`)
        firstMenuNode?.click()
      }
    })
  },

  methods: {
    async getMenu() {
      const accountMenu = (await Peace.identity.auth.getAccountMenu()).filter((item) => !item.virtual)
      // 避免浅拷贝导致数据源被污染
      const menuListSource = Peace.util.deepClone(accountMenu)
      const menuTreeSource = Peace.util.deepClone(accountMenu)

      this.menuList = menuListSource
      this.menuTree = Peace.util.arrayToTree(menuTreeSource, 'id', 'parentId')
    },

    toggleDrawer(state) {
      if (Peace.util.isType(state).isBoolean) {
        this.showDrawerModel = state
      } else {
        this.showDrawerModel = !this.showDrawerModel
      }
    },

    async getTab(index) {
      const menuListSource = Peace.util.deepClone(await Peace.identity.auth.getAccountMenu())

      const currentMenu = menuListSource.find((menu) => menu.id.toString() === index.toString() || menu.menuAlias.toString() === index.toString())

      return currentMenu
    },

    addTab(tab) {
      // 新增到当前 tab
      this.$store.commit('tabs/addTab', tab)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', tab)
    },

    parentMenuSelect(index) {
      const currentMenu = this.menuTree.find((menu) => menu.id.toString() === index)

      this.$nextTick(() => {
        // 当前为功能菜单，点击跳转功能
        if (currentMenu.menuPath) {
          this.menuSelect(index)

          this.childrenMenuTree = []
        }
        // 当前为顶级菜单，点击加载子菜单
        // 并且默认加载第一个有效的功能
        else {
          this.childrenMenuTree = currentMenu.children
          this.$nextTick().then(() => {
            const firstMenuNode = this.$el.querySelector(`.q-drawer li.el-menu-item:not(.is-disabled)`)
            firstMenuNode?.click()
          })
        }
      })
    },

    menuSelect(index) {
      const currentMenu = this.menuList.find((menu) => menu.id.toString() === index)

      // 新增到当前 tab
      this.$store.commit('tabs/addTab', currentMenu)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', currentMenu)
    },

    resetActive() {
      // step 1, 还原 header nav active
      this.resetHeaderNavActive()

      // step 2, 加载 drawer nav, 还原 drawer nav active
      this.resetDrawerNavSource()
      this.resetDrawerNavActive()

      // step 3, 还原 tabs active
      this.resetTabActive()
    },

    resetHeaderNavActive() {
      const router = this.$route?.meta
      const rootRouter = this.deepQueryRoot(this.menuList, router)

      this.defaultHeanderNavActive = rootRouter?.id.toString() ?? router?.id.toString()
    },

    resetDrawerNavSource() {
      const router = this.$route?.meta
      const rootRouter = this.deepQueryRoot(this.menuList, router)
      const currentMenu = this.menuTree.find((menu) => menu.id === rootRouter?.id)

      this.childrenMenuTree = currentMenu?.children ?? []
    },

    resetDrawerNavActive() {
      const router = this.$route?.meta

      this.defaultDrawerNavActive = router?.id.toString()
    },

    resetTabActive() {
      const router = this.$route?.meta

      // 新增到当前 tab
      this.$store.commit('tabs/addTab', router)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', router)
    },

    deepQueryRoot(list, node) {
      var arr = []

      const find = (list, node) => {
        list.some((item) => {
          if (item.id === node.parentId) {
            arr.push(item)

            return find(list, item)
          }
        })
      }

      find(list, node)

      return arr.find((item) => item.parentId === '-1')
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

    .layout-header-content {
      position: relative;
      margin: 0 auto;
    }
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