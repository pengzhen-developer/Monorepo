<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <el-menu v-on:select="menuSelect"
             v-bind:default-active="defaultActive">

      <LayoutNavItem v-for="menu in childrenMenuTree"
                     v-bind:key="menu.id"
                     v-bind:data="menu"></LayoutNavItem>

    </el-menu>
  </q-scroll-area>
</template>

<script>
import LayoutNavItem from './LayoutNavItem'

export default {
  components: {
    LayoutNavItem
  },

  inject: ['provdeMenuSelect', 'provideChildrenMenuTree'],

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
    defaultActive() {
      return this.$store.state.tabs?.activeTab?.id
    },

    menuSelect() {
      return this.provdeMenuSelect
    },

    childrenMenuTree() {
      return this.provideChildrenMenuTree()
    }
  },

  watch: {
    // 路由更新，还原 nav
    '$route.path'() {
      this.$nextTick().then(() => {
        this.resetNavSelect()
      })
    },

    // 菜单更新，还原 nav
    childrenMenuTree() {
      this.$nextTick().then(() => {
        this.resetNavSelect()
      })
    }
  },

  created() {},

  mounted() {
    this.$nextTick().then(() => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()

      // 设定导航选中
      this.resetNavSelect()
    })
  },

  methods: {
    setScrollAreaStyle() {
      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - 64}px`
      }
    },

    resetNavSelect() {
      // 初始化进入？ 默认选中第一项
      if (this.$route.path === '/layout') {
        const firstMenuNode = this.$el.querySelector(`li.el-menu-item:not(.is-disabled)`)

        firstMenuNode?.click()
      }

      // 页面被刷新？ 恢复菜单选中
      else if (this.$route.path && this.$route.name) {
        const currentMenuNode = this.$el.querySelector(`li[router="${this.$route.name}"]`)

        currentMenuNode?.click()
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