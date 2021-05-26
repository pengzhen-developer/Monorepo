<template>
  <div>
    <!-- 存在多层节点 -->
    <template v-if="data.children">
      <el-submenu v-bind:index="data.id"
                  v-bind:router="data.id"
                  v-bind:disabled="data.enable === false">

        <template slot="title">
          <i v-bind:class="{[data.menuIcon]: true }"
             class="q-mr-md menu-icon"></i>
          <label class="menu-name"
                 v-bind:class="{'sub-name':league>0}"
                 slot="title">{{ data.menuName }}</label>
        </template>

        <LayoutNavItem v-for="menu in data.children"
                       v-bind:key="menu.id"
                       v-bind:league="currentLeague"
                       v-bind:data="menu"></LayoutNavItem>
      </el-submenu>
    </template>

    <!-- 只有一层节点 -->
    <template v-else>
      <el-menu-item v-bind:key="data.id"
                    v-bind:index="data.id"
                    v-bind:router="data.id"
                    v-bind:disabled="data.enable === false"
                    v-bind:style="{'padding-left':paddingLeft}"
                    v-bind:class="{'sub-item':league>1}">
        <template v-if="data.menuIcon">
          <i v-bind:class="{[data.menuIcon]: true }"
             class="q-mr-md menu-icon"></i>
        </template>
        <label class="menu-name cursor-pointer">{{ data.menuName }}</label>
      </el-menu-item>
    </template>

  </div>

</template>

<script>
export default {
  name: 'LayoutNavItem',

  props: {
    data: Object,
    league: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  computed: {
    currentLeague() {
      let league = this.league
      return (league += 1)
    },
    paddingLeft() {
      return this.league > 0 ? 20 * this.league + 56 + 'px!important' : '0'
    }
  }
}
</script>

<style lang="scss" scoped>
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

.menu-name {
  font-size: 16px;
  font-weight: 400;
  color: #333330;
  line-height: 24px;
  &.sub-name {
    font-size: 14px;
  }
}

.el-submenu {
  &.is-opened {
    background: linear-gradient(#ffffff, #f9f9f9);

    .el-menu-item {
      background: #ffffff;
      &.sub-item {
        background: #f9f9f9;
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
  padding-left: 34px !important;
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