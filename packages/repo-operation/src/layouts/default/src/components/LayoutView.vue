<template>
  <q-scroll-area class="bg-grey-2"
                 v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <div v-bind:style="routerViewStyle">
      <transition appear
                  mode="out-in"
                  name="el-fade-in-linear">
        <keep-alive v-bind:include="keepAliveInclude">
          <router-view class="router-view"
                       v-bind:key="$route.fullPath"
                       v-bind:style="isIFrame ? routerViewIframeStyle : routerViewStyle"></router-view>
        </keep-alive>
      </transition>
    </div>
  </q-scroll-area>
</template>

<script>
import { dom } from 'quasar'

import obLayoutTabs from './../observable/ob-layout-tabs'

export default {
  data() {
    return {
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {},
      routerViewStyle: {},
      routerViewIframeStyle: {},

      isIFrame: undefined
    }
  },

  computed: {
    keepAliveInclude() {
      // 基于 layout - tabs 实现标签页的缓存
      // ** 请注意， component name 与 menuAlias 必须保持一致
      return obLayoutTabs.state.tabs.map((item) => item.menuAlias)
    }
  },

  watch: {
    $route() {
      this.isIFrame = Peace.validate.isUrl(this.$route.meta.menuPath)

      this.setRouterViewStyle()
    }
  },

  created() {
    this.isIFrame = Peace.validate.isUrl(this.$route.meta.menuPath)
  },

  mounted() {
    this.$nextTick().then(() => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
      // 设定路由区域样式
      this.setRouterViewStyle()
    })

    window.addEventListener('resize', () => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
      // 设定路由区域样式
      this.setRouterViewStyle()
    })
  },

  methods: {
    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    },

    setRouterViewStyle() {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this?.$el)

      // 内部 vue 设定最小高度，由 vue 组件控制滚动
      this.routerViewStyle = {
        ['min-height']: `${document.body.clientHeight - offset?.top}px`
      }

      // 外部 iframe 设定高度，由 iframe 具体功能控制滚动
      this.routerViewIframeStyle = {
        ['height']: `${document.body.clientHeight - offset?.top}px`
      }
    }
  }
}
</script>

<style>
</style>