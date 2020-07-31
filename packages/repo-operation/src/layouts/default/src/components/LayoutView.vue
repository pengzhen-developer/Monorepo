<template>
  <q-scroll-area class="bg-grey-2 q-pt-md q-pr-md q-pb-none q-pl-md"
                 v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">

    <div v-if="isIFrame"
         v-bind:style="routerViewStyle">

      <transition appear
                  mode="out-in"
                  name="el-fade-in-linear">
        <router-view class="router-view iframe-router-view"
                     v-bind:key="$route.meta.menuPath"
                     v-bind:style="routerViewIframeStyle"></router-view>
      </transition>
    </div>

    <div v-show="!isIFrame"
         v-bind:style="routerViewStyle">
      <transition appear
                  mode="out-in"
                  name="el-fade-in-linear">
        <keep-alive>
          <router-view class="router-view bg-white q-pa-md"
                       v-bind:key="$route.fullPath"
                       v-bind:style="routerViewStyle"></router-view>
        </keep-alive>
      </transition>
    </div>
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
      routerViewIframeStyle: {},

      isIFrame: undefined
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
  },

  methods: {
    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    },

    setRouterViewStyle() {
      // 存在 300 ms 的 router-view 切换特效
      const offset = dom.offset(this?.$el)

      this.routerViewStyle = {
        ['min-height']: `${document.body.clientHeight - offset?.top - 16}px`
      }

      this.routerViewIframeStyle = {
        ['height']: `${document.body.clientHeight - offset?.top - 16}px`
      }
    }
  }
}
</script>

<style>
</style>