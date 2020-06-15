<template>

  <!-- 支持 hybrid -->
  <div v-if="hybrid.isHybrid">
    <q-layout class="layout"
              view="hHh lpR lFf">

      <q-header v-if="hybrid.layout.includes('header')"
                class="layout-header bg-white text-grey-7 q-mb-xs">
        <LayoutHeader></LayoutHeader>
      </q-header>

      <q-drawer class="layout-drawer"
                side="left"
                show-if-above
                v-if="hybrid.layout.includes('drawer')"
                v-bind:width="260"
                v-model="showDrawerModel">
        <LayoutNav></LayoutNav>
      </q-drawer>

      <q-page-container>
        <q-page class="bg-grey-1">
          <LayoutView class="bg-grey-2"></LayoutView>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>

  <!-- 普通模式 -->
  <div v-else>
    <q-layout class="layout"
              view="hHh lpR lFf">

      <q-header class="layout-header bg-white text-grey-7 q-mb-xs">
        <LayoutHeader></LayoutHeader>
      </q-header>

      <q-drawer class="layout-drawer"
                side="left"
                show-if-above
                v-bind:width="260"
                v-model="showDrawerModel">
        <LayoutNav></LayoutNav>
      </q-drawer>

      <q-page-container>
        <q-page class="bg-grey-1">
          <LayoutTabs class="bg-white"></LayoutTabs>
          <LayoutView class="bg-grey-2"></LayoutView>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
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
      provideToggleDrawer: this.toggleDrawer
    }
  },

  data() {
    return {
      showDrawerModel: true,

      hybrid: {
        isHybrid: undefined,
        layout: ''
      }
    }
  },

  created() {
    this.setUrlParams()
  },

  methods: {
    setUrlParams() {
      this.hybrid.isHybrid = Peace.util.queryUrlParam('hybrid') === 'true'
      this.hybrid.layout = Peace.util.queryUrlParam('layout')
    },

    toggleDrawer(state) {
      if (Peace.util.type(state).isBoolean) {
        this.showDrawerModel = state
      } else {
        this.showDrawerModel = !this.showDrawerModel
      }
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
  }
}
</style>