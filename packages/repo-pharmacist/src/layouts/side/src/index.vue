/** 
 * 侧边栏导航
 *
 */

<template>
  <div>
    <q-layout class="layout"
              view="hHh lpR lFf">

      <LayoutNotify>

        <q-header class="layout-header">
          <LayoutHeader class="layout-header-content"></LayoutHeader>
        </q-header>

        <q-drawer class="layout-drawer"
                  side="left"
                  show-if-above
                  v-bind:width="240"
                  v-bind:breakpoint="0">
          <LayoutSide></LayoutSide>
        </q-drawer>

        <q-page-container>
          <q-page class="bg-grey-1">
            <LayoutTab></LayoutTab>
            <LayoutView></LayoutView>
          </q-page>
        </q-page-container>

      </LayoutNotify>
    </q-layout>
  </div>
</template>

<script>
import Observable from './observable'

import LayoutHeader from './components/LayoutHeader'
import LayoutSide from './components/LayoutSide'
import LayoutTab from './components/LayoutTab'
import LayoutView from './components/LayoutView'

import LayoutNotify from './components/LayoutNotify'

export default {
  components: {
    LayoutHeader,
    LayoutSide,
    LayoutTab,
    LayoutView,

    LayoutNotify
  },

  created() {
    // layout 初始化，从缓存还原标签状态
    Observable.mutations.restoreTabs()
    Observable.mutations.restoreTab()
  }
}
</script>

<style>
</style>