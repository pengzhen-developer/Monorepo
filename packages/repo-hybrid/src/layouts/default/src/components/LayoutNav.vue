<template>
  <q-scroll-area v-bind:thumb-style="thumbStyle"
                 v-bind:style="scrollAreaStyle">
    <el-menu v-on:select="menuSelect"
             v-bind:default-active="defaultActive">

      <el-submenu v-for="menu in menuTree"
                  v-bind:key="menu.id"
                  v-bind:index="menu.id">

        <template slot="title">
          <i class="q-mr-md el-icon-location text-h6 text-weight-bolder text-grey-7"></i>

          <label class="text-black text-subtitle2"
                 slot="title">{{ menu.menuName }}</label>
        </template>

        <el-menu-item v-for="menu in menu.children"
                      v-bind:key="menu.id"
                      v-bind:index="menu.id"
                      v-bind:router="menu.menuRoute">
          <label>{{ menu.menuName }}</label>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </q-scroll-area>
</template>

<script>
import Peace from '@src/library'

export default {
  data() {
    return {
      menuList: [],
      menuTree: {},

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
    }
  },

  watch: {
    // 路由更新，还原 nav
    '$route.path'() {
      this.resetNavSelect()
    }
  },

  created() {
    this.getMenu()
  },

  mounted() {
    this.$nextTick().then(() => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()

      // 设定导航选中
      this.resetNavSelect()
    })
  },

  methods: {
    getMenu() {
      // 避免浅拷贝导致数据源被污染
      const menuListSource = Peace.util.deepClone(window.configuration.routes.layoutNavMenu)
      const menuTreeSource = Peace.util.deepClone(window.configuration.routes.layoutNavMenu)

      this.menuList = menuListSource
      this.menuTree = Peace.util.arrayToTree(menuTreeSource, 'id', 'parentId')
    },

    setScrollAreaStyle() {
      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - 64}px`
      }
    },

    resetNavSelect() {
      // 初始化进入？ 默认选中第一项
      if (this.$route.path === '/layout') {
        const firstMenuNode = this.$el.querySelector(`li[class='el-menu-item']`)

        firstMenuNode?.click()
      }

      // 页面被刷新？ 恢复菜单选中
      else if (this.$route.path && this.$route.name) {
        const currentMenuNode = this.$el.querySelector(`li[router='${this.$route.name}']`)

        currentMenuNode?.click()
      }
    },

    menuSelect(index) {
      const currentMenu = this.menuList.find((menu) => menu.id === index)

      // 新增到当前 tab
      this.$store.commit('tabs/addTab', currentMenu)
      // 选中当前 tab
      this.$store.commit('tabs/selectTab', currentMenu)
    }
  }
}
</script>


<style lang="scss" scoped>
.el-menu {
  border-right: none;

  .el-submenu {
    &.is-opened {
      background: linear-gradient(#ffffff, #f9f9f9);

      .el-menu-item {
        background: #f9f9f9;
      }
    }
  }

  .el-menu-item {
    &:hover {
      color: var(--q-color-primary);
    }

    &.is-active {
      background: rgba(0, 166, 206, 0.1) !important;

      &::before {
        content: '';
        position: absolute;
        left: 0;

        display: inline-block;
        height: 100%;
        width: 4px;

        background: var(--q-color-primary);
      }
    }

    label {
      cursor: pointer;
      font-size: 14px;
      margin-left: 16px;
    }
  }
}
</style>