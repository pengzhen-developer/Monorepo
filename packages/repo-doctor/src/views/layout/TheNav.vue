<template>
  <el-menu :collapse="true" :default-active="layout.selectTab" @select="menuSelect" class="nav-menu">
    <template v-for="menu in menuListTree">
      <el-submenu :index="menu.path" :key="menu.path" v-if="menu.children && menu.children.length > 0">
        <template slot="title">
          <div class="nav-submenu">
            <i :class="menu.icon"></i>
            <label>{{ menu.name }}</label>
          </div>
        </template>

        <el-menu-item :index="menuChildren.path" :key="menuChildren.path" v-for="menuChildren in menu.children">{{ menuChildren.name }}</el-menu-item>
      </el-submenu>

      <el-menu-item :closable="menu.closable" :index="menu.path" :key="menu.path" v-else>
        <div class="nav-submenu">
          <i :class="menu.icon"></i>
          <label>{{ menu.name }}</label>
        </div>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      menuListTree: []
    }
  },

  computed: {
    ...mapState(['layout'])
  },

  created() {
    // list to tree
    const tempMenuList = $peace.util.clone(this.layout.menuList)
    this.menuListTree = $peace.util.toTree(tempMenuList, 'id', 'pid', 'children')
  },

  mounted() {},

  methods: {
    ...mapActions('layout', ['selectTab', 'pushTab', 'unshiftTab', 'removeTab', 'clearTab']),

    menuSelect(path) {
      const menu = this.layout.menuList.find(item => item.path === path)

      this.pushTab(menu)
      this.selectTab(menu.path)

      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  border-left: none;
}

/deep/ .el-submenu,
/deep/ .el-submenu__title,
/deep/ .el-menu-item {
  height: 72px;
  line-height: 1;

  &.is-active {
    .nav-submenu {
      label,
      i {
        color: $--color-primary;
      }
    }
  }

  .nav-submenu {
    height: 72px;
    line-height: 1;

    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    flex-flow: column;

    i {
      font-size: 24px;
      margin-bottom: 4px;
    }
    label {
      line-height: 24px;
    }
  }
}
</style>
