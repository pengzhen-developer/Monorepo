<template>
  <fragment>
    <!-- 存在多层节点 -->
    <template v-if="data.children">
      <el-submenu v-bind:index="data.id"
                  v-bind:router="data.id"
                  v-bind:disabled="data.enable === false"
                  v-bind:class="`level-${level}`">

        <div class="menu-item"
             slot="title">
          <i v-bind:class="{[data.menuIcon]: true }"
             class="menu-icon"></i>
          <label class="menu-name"
                 slot="title">{{ data.menuName }}</label>
        </div>

        <LayoutNavItem v-for="menu in data.children"
                       v-bind:key="menu.id"
                       v-bind:data="menu"
                       v-bind:level="level + 1"></LayoutNavItem>
      </el-submenu>
    </template>

    <!-- 只有一层节点 -->
    <template v-else>
      <el-menu-item v-bind:key="data.id"
                    v-bind:index="data.id"
                    v-bind:router="data.id"
                    v-bind:disabled="data.enable === false"
                    v-bind:class="`level-${level}`">
        <div class="menu-item">
          <template v-if="data.menuIcon">
            <i v-bind:class="{[data.menuIcon]: true }"
               class="menu-icon"></i>
          </template>
          <label class="menu-name cursor-pointer">{{ data.menuName }}</label>
        </div>
      </el-menu-item>
    </template>

  </fragment>

</template>

<script>
export default {
  name: 'LayoutNavItem',

  props: {
    data: Object,
    level: Number
  }
}
</script>

<style lang="scss">
.el-menu.el-menu--popup {
  box-shadow: 0 0 4px 1px #d0d0d0;
  min-width: 50px;
  padding: 0;

  .el-menu-item {
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
.level-0 {
  height: 64px;
  line-height: 1;
  color: #cecece;

  &.is-active {
    color: var(--q-color-primary);

    ::v-deep .el-submenu__title {
      color: var(--q-color-primary);
    }
  }

  ::v-deep .el-submenu__title {
    height: 64px;
    line-height: 1;
    color: #cecece;

    &.is-active {
      color: var(--q-color-primary);
    }
  }

  .menu-item {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-icon {
      font-size: 24px;
      margin: 0 0 4px 0;
      color: inherit;
    }

    .menu-name {
      font-size: 12px;
      color: inherit;
    }
  }
}
</style>