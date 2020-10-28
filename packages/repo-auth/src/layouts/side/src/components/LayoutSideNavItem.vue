<template>
  <div>
    <div v-for="(menu, index) in data"
         v-bind:key="menu.id"
         v-bind:index="index"
         v-bind:class="`level-${ level }`">
      <el-submenu v-if="menu.children"
                  v-bind:index="menu.id">
        <template slot="title">
          <template v-if="level === 0">
            <i v-bind:class="`q-mr-md menu-icon ${menu.menuIcon}`"></i>
          </template>

          <span class="menu-name">{{ menu.menuName }}</span>
        </template>

        <LayoutSideNavItem v-bind:data="menu.children"
                           v-bind:level="level + 1">
        </LayoutSideNavItem>
      </el-submenu>

      <el-menu-item v-else
                    v-bind:index="menu.id">
        <template v-if="level === 0">
          <i v-bind:class="`q-mr-md menu-icon ${menu.menuIcon}`"></i>
        </template>

        <span class="menu-name">{{ menu.menuName }}</span>
      </el-menu-item>
    </div>
  </div>

</template>

<script>
export default {
  name: 'LayoutSideNavItem',

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },

    level: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-icon {
  display: inline-block;
  width: 28px;
  font-size: 24px;
  color: #555555;
}

.level-0 {
  .menu-name {
    font-size: 16px;
  }
}

::v-deep {
  .el-submenu__title {
    padding-left: 32px !important;
    height: 60px;
    line-height: 60px;
  }

  .el-icon-arrow-down {
    color: #555555;
  }
}

.menu-icon {
  display: inline-block;
  width: 28px;
  font-size: 24px;
  color: #555555;
}

.el-submenu {
  &.is-opened {
    background: linear-gradient(#ffffff, #f9f9f9);

    .el-menu-item {
      background: #f9f9f9;
      &.sub-item {
        background: #f1f1f1;
      }
    }
  }

  .el-menu-item {
    padding-left: 76px !important;
    height: 50px;
    line-height: 50px;

    .menu-name {
      font-size: 14px;
      color: #333330;
      line-height: 28px;
    }

    &.is-active {
      .menu-name {
        color: var(--q-color-primary);
      }
    }
  }
}

.el-menu-item {
  padding-left: 32px !important;
  height: 60px;
  line-height: 60px;

  &:hover {
    color: var(--q-color-primary);
  }

  &.is-active {
    background: rgba(0, 166, 206, 0.1) !important;

    .menu-icon {
      color: var(--q-color-primary);
    }

    .menu-name {
      color: var(--q-color-primary);
    }

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
}
</style>