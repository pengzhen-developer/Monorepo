<template>
  <div class="layout-side-nav-item">
    <div v-for="(menu, index) in data"
         v-bind:key="menu.id"
         v-bind:index="index"
         v-bind:class="`menuitem-level-${ level }`">
      <el-submenu v-if="menu.children"
                  v-bind:index="menu.id">
        <template slot="title">
          <template v-if="level === 0">
            <i v-bind:class="`menu-icon ${menu.menuIcon}`"></i>
            <span class="menu-name">{{ menu.menuName }}</span>
          </template>
          <template v-else-if="level === 1">
            <span class="menu-name"
                  v-bind:style="{ 'padding-left': level * 8 + 12 + 'px' }">{{ menu.menuName }}</span>
          </template>
          <template v-else>
            <span class="menu-name"
                  v-bind:style="{ 'padding-left': level * 10 + 12 + 'px' }">{{ menu.menuName }}</span>
          </template>

        </template>

        <LayoutSideNavItem v-bind:data="menu.children"
                           v-bind:level="level + 1">
        </LayoutSideNavItem>
      </el-submenu>

      <el-menu-item v-else
                    v-bind:index="menu.id">
        <template v-if="level === 0">
          <i v-bind:class="`menu-icon ${menu.menuIcon}`"></i>
          <span class="menu-name">{{ menu.menuName }}</span>
        </template>

        <template v-else-if="level === 1">
          <span class="menu-name"
                v-bind:style="{ 'padding-left': level * 8 + 12 + 'px' }">{{ menu.menuName }}</span>
        </template>
        <template v-else>
          <span class="menu-name"
                v-bind:style="{ 'padding-left': level * 10 + 12 + 'px' }">{{ menu.menuName }}</span>
        </template>

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
.layout-side-nav-item {
  .menu-name {
    font-size: 14px;
  }

  .menu-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    color: #444444;
    font-size: 24px;
    width: 24px;

    margin: 0 16px 0 0;
  }
}
</style>

