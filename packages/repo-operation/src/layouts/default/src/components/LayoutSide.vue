<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <el-menu class="element-ui-default layout-side"
             v-bind:default-active="selectedNavMenu.id"
             v-on:select="menuSelect">
      <!-- side-top -->
      <LayoutSideNavItem v-if="window.configuration.layout.side.showTopNav"
                         v-bind:data="selectedTopMenu.children"></LayoutSideNavItem>
      <!-- side -->
      <LayoutSideNavItem v-else
                         v-bind:data="accountMenuTree"></LayoutSideNavItem>
    </el-menu>
  </q-scroll-area>
</template>

<script>
import { dom } from 'quasar'

import obAccount from './../observable/ob-account'
import obLayoutTabs from './../observable/ob-layout-tabs'
import obLayoutMenu from './../observable/ob-layout-menu'

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
      }
    }
  },

  computed: {
    accountMenu: () => obAccount.state.accountMenu ?? [],
    accountMenuTree: () => obAccount.state.accountMenuTree ?? [],

    selectedTopMenu: () => obLayoutMenu.state.selectedTopMenu ?? {},
    selectedNavMenu: () => obLayoutMenu.state.selectedNavMenu ?? {}
  },

  mounted() {
    this.$nextTick().then(async () => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })

    window.addEventListener('resize', () => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })
  },

  methods: {
    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    },

    menuSelect(id) {
      const selectedNavMenu = this.accountMenu.find((item) => item.id === id)

      obLayoutMenu.mutations.setSelectedNavMenu(selectedNavMenu)
      obLayoutTabs.mutations.addTab(selectedNavMenu)
      obLayoutTabs.mutations.setTab(selectedNavMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

::v-deep .layout-side {
  .el-submenu__icon-arrow {
    top: unset;

    height: 100%;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    margin: 0 !important;
    padding: 0 !important;
  }

  .el-menu-item.is-active {
    background: #d6edf0 !important;
  }
}
</style>