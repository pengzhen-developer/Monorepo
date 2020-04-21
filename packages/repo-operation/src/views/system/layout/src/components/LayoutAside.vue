<template>
  <div class="aside">
    <div class="aside-description">
      <div class="logo">
        <el-image v-bind:src="logoImage"></el-image>
      </div>
      <span class="title-1">九州通智药云平台</span>
      <span class="title-2">运营端</span>
    </div>

    <div class="aside-nav">

      <el-menu v-bind:default-active="defaultActive"
               v-on:select="menuSelect">
        <el-submenu index="1">
          <template slot="title">
            <i class="icon el-icon-s-home"></i>
            <span>账号中心</span>
          </template>

          <el-menu-item v-bind:index="managerPath">账号管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon el-icon-menu"></i>
            <span>服务中心</span>
          </template>

          <el-menu-item v-bind:index="servicePath">服务管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

  </div>
</template>

<script>
import routerPath from '@src/router/routerPath'

export default {
  data() {
    return {
      defaultActive: this.$route.path,

      managerPath: routerPath.account.LAYOUT_MANAGER,
      servicePath: routerPath.service.LAYOUT_MANAGER,

      logoImage: require('@src/assets/img/logo.png')
    }
  },

  methods: {
    menuSelect(key) {
      if (key !== this.$route.path) {
        this.$router.push(key)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  background: rgba(255, 255, 255, 1);

  .aside-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 52px 56px;

    .logo {
      width: 120px;
      height: 60px;
      overflow: hidden;
      margin: 0 0 10px 0;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }

    .title-1 {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);

      margin: 0 0 10px 0;
    }

    .title-2 {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .aside-nav {
    ::v-deep .el-menu {
      height: 100%;
      border-right: 0;

      .el-submenu__title {
        display: flex;
        align-items: center;

        .icon {
          font-size: 24px;
          margin: 0 20px 0 0;
        }
      }

      .el-menu-item {
        margin: 0 0 0 24px;

        &:hover,
        &:focus {
          background: none;
          color: $--color-primary;
        }
      }

      .is-active {
        .el-submenu__title {
          background: $--color-primary-light-9;
          color: $--color-primary;

          &::before {
            content: '';
            position: absolute;
            left: 0;

            width: 4px;
            height: 100%;

            background: $--color-primary;
          }

          i {
            color: $--color-primary;
          }
        }
      }

      .el-menu--inline {
        background: linear-gradient(#ffffff, #fafafa, #fcf9fc);
      }
    }
  }
}
</style>