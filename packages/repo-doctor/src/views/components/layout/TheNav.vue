<template>
  <el-menu :collapse="true" :default-active="$store.state.layout.currentTab" @select="menuSelect" class="nav-menu">
    <template v-for="menu in menuListTree">
      <el-submenu :index="menu.path" :key="menu.path" v-if="menu.children && menu.children.length > 0">
        <template slot="title">
          <div class="nav-submenu">
            <i :class="menu.icon"></i>
            <label>{{ menu.name }}</label>
          </div>
        </template>

        <el-menu-item :index="menuChildren.path" :key="menuChildren.path" v-for="menuChildren in menu.children">
          <label>{{ menuChildren.name }}</label>
        </el-menu-item>
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
import peace from '@src/library'

export default {
  data() {
    return {
      menuList: peace.config.menu.menuList
    }
  },

  computed: {
    menuListTree() {
      return peace.util.toTree(peace.util.deepClone(this.menuList), 'id', 'pid', 'children')
    }
  },

  methods: {
    menuSelect(path) {
      const currentMenu = this.menuList.find(item => item.path === path)

      // 将当前选中的项，添加到 tab
      this.$store.commit('layout/pushTab', currentMenu)

      // 选中当前 tab
      this.$store.commit('layout/selectTab', currentMenu.path)

      // 跳转当前路由
      this.$router.push(currentMenu.path)
    }
  }
}
</script>

<style lang="scss">
.el-menu.el-menu--popup {
  box-shadow: 0 0 4px 1px #d0d0d0;
  min-width: 50px;
  padding: 0;

  /deep/ .el-menu-item {
    height: 40px;
    line-height: 40px;

    label {
      cursor: pointer;
      display: block;
      border-bottom: 1px solid #ececec;
    }
  }
}
</style>


<style lang="scss" scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  border-left: none;
}

/deep/ .el-submenu,
/deep/ .el-submenu__title,
/deep/ .el-menu-item {
  line-height: 1;
  margin: 10px 0 20px 0;

  &:hover {
    background: transparent;

    .nav-submenu {
      label,
      i {
        color: $--color-primary;
      }
    }
  }

  &:focus {
    background: transparent;
  }

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
    align-items: center;
    flex-flow: column;

    i {
      font-size: 24px;
      margin-bottom: 4px;

      color: #cecece;
    }
    label {
      line-height: 24px;

      color: #cecece;
    }
  }
}
</style>
