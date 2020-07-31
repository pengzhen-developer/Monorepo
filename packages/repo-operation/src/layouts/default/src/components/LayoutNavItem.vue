<template>
  <div>
    <!-- 存在多层节点 -->
    <template v-if="data.children">
      <el-submenu v-bind:index="data.id.toString()"
                  v-bind:router="data.id.toString()"
                  v-bind:disabled="!data.enable">

        <template slot="title">
          <i v-bind:class="{[data.menuIcon]: true }"
             class="q-mr-md text-h6 text-weight-bolder text-grey-7"></i>
          <label class="text-black text-subtitle2"
                 slot="title">{{ data.menuName }}</label>
        </template>

        <LayoutNavItem v-for="menu in data.children"
                       v-bind:key="menu.id.toString()"
                       v-bind:data="menu"></LayoutNavItem>
      </el-submenu>
    </template>

    <!-- 只有一层节点 -->
    <template v-else>
      <el-menu-item v-bind:key="data.id.toString()"
                    v-bind:index="data.id.toString()"
                    v-bind:router="data.id.toString()"
                    v-bind:disabled="!data.enable">
        <template v-if="data.menuIcon">
          <i v-bind:class="{[data.menuIcon]: true }"
             class="q-mr-md text-h6 text-weight-bolder text-grey-7"></i>
        </template>

        <label class="text-black text-caption cursor-pointer">{{ data.menuName }}</label>
      </el-menu-item>
    </template>

  </div>

</template>

<script>
export default {
  name: 'LayoutNavItem',

  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.el-submenu {
  &.is-opened {
    background: linear-gradient(#ffffff, #f9f9f9);

    .el-menu-item {
      background: #f9f9f9;
    }
  }

  i {
    width: 28px;
    display: inline-block;
  }

  .el-menu-item {
    padding-left: 64px !important;
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

  i {
    width: 28px;
    display: inline-block;
  }
}
</style>