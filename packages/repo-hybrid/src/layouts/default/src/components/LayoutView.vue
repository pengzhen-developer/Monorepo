<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <div class="q-pa-md">
      <transition appear
                  mode="out-in"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeIn">
        <router-view class="bg-white q-pa-md"
                     v-bind:style="routerViewStyle"></router-view>
      </transition>
    </div>
  </q-scroll-area>
</template>

<script>
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
      routerViewStyle: {}
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
      const offset = dom.offset(this.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset.top}px`
      }
    },

    setRouterViewStyle() {
      // const offset = dom.offset(this.$el)
      // this.routerViewStyle = {
      //   height: `${document.body.clientHeight - offset.top}px`
      // }
    }
  }
}
</script>

<style>
</style>