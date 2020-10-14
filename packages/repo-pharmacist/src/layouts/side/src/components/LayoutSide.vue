<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <el-menu v-bind:default-active="menuActive"
             v-on:select="selectMenu">
      <LayoutSideNavItem v-bind:data="menuTree"></LayoutSideNavItem>
    </el-menu>
  </q-scroll-area>
</template>

<script>
import { dom } from 'quasar'
import Observable from './../observable'

import LayoutSideNavItem from './LayoutSideNavItem'

export default {
  components: {
    LayoutSideNavItem
  },

  data() {
    return {
      scrollAreaStyle: {},

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },

      menuList: [],
      menuTree: [],

      menuActive: ''
    }
  },

  computed: {
    tab: () => Observable.state.tab,
    tabs: () => Observable.state.tabs
  },

  watch: {
    tab: {
      handler() {
        if (this.tab) {
          this.menuActive = this.tab.id
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.$nextTick().then(async () => {
      const accountMenu = await Peace.identity.auth.getAccountMenu()

      // 设定滚动区域样式
      this.setScrollAreaStyle()

      // 组织菜单结构
      this.menuList = Peace.util.deepClone(accountMenu)
      this.menuTree = Peace.util.arrayToTree(Peace.util.deepClone(accountMenu), 'id', 'parentId')

      this.$nextTick().then(() => {
        // 当 tabs 缓存不存在
        // 默认选中菜单第一项
        if (this.tabs.length === 0 || this.tab.id === undefined) {
          Observable.mutations.setTabs([])
          Observable.mutations.setTab({})

          document.body.querySelector(`.q-drawer li.el-menu-item:not(.is-disabled)`)?.click()
        }
      })
    })
  },

  methods: {
    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    },

    selectMenu(id) {
      const menu = this.menuList.find((item) => item.id === id)

      Observable.mutations.addTab(menu)
      Observable.mutations.setTab(menu)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>