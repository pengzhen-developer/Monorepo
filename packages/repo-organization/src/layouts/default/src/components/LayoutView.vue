<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <template v-if="isIFrame">
      <transition appear
                  mode="out-in"
                  name="el-fade-in-linear">
        <router-view class="iframe-router-view "
                     v-bind:key="$route.fullPath"
                     v-bind:style="routerViewIframeStyle"></router-view>
      </transition>
    </template>
    <template v-else>
      <transition appear
                  mode="out-in"
                  name="el-fade-in-linear">
        <router-view class="router-view"
                     v-bind:key="$route.fullPath"
                     v-bind:style="routerViewStyle"></router-view>
      </transition>
    </template>
  </q-scroll-area>
</template>

<script>
import Peace from '@src/library'
import { dom } from 'quasar'

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
      routerViewIframeStyle: {}
    }
  },

  computed: {
    isIFrame() {
      return Peace.validate.isUrl(this.$route.meta.menuPath)
    }
  },

  watch: {
    $route() {
      this.setRouterViewStyle()
    }
  },

  mounted() {
    this.$nextTick().then(() => {
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