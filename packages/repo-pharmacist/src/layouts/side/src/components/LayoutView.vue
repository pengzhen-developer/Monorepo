<template>
  <q-scroll-area class="bg-grey-2"
                 v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <transition appear
                mode="out-in"
                name="el-fade-in-linear">
      <keep-alive v-bind:include="keepAliveInclude">
        <router-view class="router-view"
                     v-bind:key="$route.fullPath"
                     v-bind:style="routerViewStyle"></router-view>
      </keep-alive>
    </transition>
  </q-scroll-area>
</template>

<script>
import { dom } from 'quasar'
import Observable from './../observable'

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
      routerViewStyle: {}
    }
  },

  computed: {
    keepAliveInclude() {
      // 基于 layout - tabs 实现标签页的缓存
      // ** 请注意， component name 与 menuAlias 必须保持一致
      return Observable.state.tabs.map((item) => item.menuAlias)
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
    }
  }
}
</script>

<style>
</style>