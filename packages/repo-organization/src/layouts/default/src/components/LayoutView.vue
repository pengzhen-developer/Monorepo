<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <div class="q-pt-md q-pr-md q-pb-none q-pl-md">
      <template v-if="isIFrame">
        <transition appear
                    mode="out-in"
                    name="el-fade-in-linear">
          <router-view class="iframe-router-view"
                       v-bind:key="$route.fullPath"
                       v-bind:style="routerViewIframeStyle"></router-view>
        </transition>
      </template>
      <template v-else>
        <transition appear
                    mode="out-in"
                    name="el-fade-in-linear">
          <router-view class="router-view bg-white q-pa-md"
                       v-bind:key="$route.fullPath"
                       v-bind:style="routerViewStyle"></router-view>
        </transition>
      </template>
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
      // 存在 300 ms 的 router-view 切换特效
      // 仅设定 iframe 样式
      setTimeout(() => {
        const element = this?.$el?.querySelector('.iframe-router-view')

        if (element) {
          const offset = dom.offset(element)
          this.routerViewIframeStyle = {
            height: `${document.body.clientHeight - offset?.top - 8}px`
          }
        }
      }, 300)
    }
  }
}
</script>

<style>
</style>