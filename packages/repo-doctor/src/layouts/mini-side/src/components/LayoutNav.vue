<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <el-menu v-on:select="menuSelect"
             v-bind:collapse="true"
             v-bind:default-active="defaultActive">

      <LayoutNavItem v-for="menu in menuTree"
                     v-bind:key="menu.id"
                     v-bind:data="menu"></LayoutNavItem>

    </el-menu>
  </q-scroll-area>
</template>

<script>
import LayoutNavItem from './LayoutNavItem'
import { dom } from 'quasar'

export default {
  components: {
    LayoutNavItem
  },

  inject: ['provdeMenuSelect', 'provideMenuTree'],

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
  props: {
    defaultActive: String
  },
  computed: {
    // defaultActive() {
    //   return this.$store.state.tabs?.activeTab?.id
    // },

    menuSelect() {
      return this.provdeMenuSelect
    },

    menuTree() {
      return this.provideMenuTree()
    }
  },

  created() {},

  mounted() {
    this.$nextTick().then(() => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
    })
  },

  methods: {
    setScrollAreaStyle() {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>