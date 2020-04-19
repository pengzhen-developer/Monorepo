<template>
  <div class="aside">
    <div class="aside-description">
      <div class="logo"
           v-on:click="goWebSite">
        <el-image v-bind:src="require('@src/assets/img/logo.png')"></el-image>
      </div>
      <span class="title-1">九州通智药云平台</span>
      <span class="title-2">控制台</span>
    </div>

    <div class="aside-nav">

      <el-menu v-bind:unique-opened="true"
               v-bind:default-active="defaultActive"
               v-on:select="menuSelect">
        <el-submenu index="1">
          <template slot="title">
            <i class="icon el-icon-s-home"></i>
            <span>账号中心</span>
          </template>

          <el-menu-item v-bind:index="servicePath">服务信息</el-menu-item>
          <el-menu-item v-bind:index="basePath">基本信息</el-menu-item>
          <el-menu-item v-bind:index="securityPath">安全信息</el-menu-item>
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

      servicePath: routerPath.account.LAYOUT_SERVICE_INFO,
      basePath: routerPath.account.LAYOUT_BASE_INFO,
      securityPath: routerPath.account.LAYOUT_SECURITY_INFO
    }
  },

  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()

    console.log(to, from)
    next()
  },

  methods: {
    menuSelect(key) {
      if (key !== this.$route.path) {
        this.$router.push(key)
      }
    },

    goWebSite() {
      const url = process.env.VUE_APP_WEB_SITE

      window.open(url)
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
      height: 62px;
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
        background: linear-gradient(#fafafa, #fcf9fc);
      }
    }
  }
}
</style>