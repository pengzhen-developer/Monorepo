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
import Peace from '@src/library'
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

    // 菜单更新，默认选中第一项 or 当前路由
    childrenMenuTree() {
      this.$nextTick().then(() => {
        const currentMenuNode = this.$el.querySelector(`li[router="${this.$route.meta.id}"]`)

        // 当前路由属于 nihility，并不存在于菜单，可以直接通过路由控制跳转
        if (Peace.validate.isUrl(this.$route.meta.menuPath)) {
          // no code
        }

        // 当前路由属于左侧菜单的某一项，模拟点击，跳转路由
        else if (currentMenuNode) {
          return currentMenuNode.click()
        }

        // 当前路由不存在？选中当前导航下第一个有效的菜单
        else {
          const firstMenuNode = this.$el.querySelector(`li.el-menu-item:not(.is-disabled)`)
          firstMenuNode?.click()
        }
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

      // 恢复菜单选中
      else {
        const currentMenuNode = this.$el.querySelector(`li[router="${this.$route.meta.id}"]`)

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