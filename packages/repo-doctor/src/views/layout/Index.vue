<template>
  <div class="layout">
    <the-header class="layout-header"></the-header>

    <div class="layout-body">
      <div class="layout-body-left">
        <the-nav></the-nav>
      </div>

      <div class="layout-body-right">
        <div class="layout-body-right-tab">
          <the-tab></the-tab>
        </div>
        <div class="layout-body-right-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TheHeader from './TheHeader'
import TheTab from './TheTab'
import TheNav from './TheNav'

export default {
  components: {
    TheHeader,
    TheTab,
    TheNav
  },

  computed: {
    ...mapState(['layout'])
  },

  watch: {
    '$route.path': {
      handler(val) {
        if (this.layout.tabList.length === 0) {
          // 初始化选中主页
          const path = '/home'

          const menu = this.layout.menuList.find(item => item.path === path)

          this.pushTab(menu)
          this.selectTab(menu.path)

          this.$router.push(path)
        }

        const path = val === '/' ? '/home' : val

        const menu = this.layout.menuList.find(item => item.path === path)

        this.pushTab(menu)
        this.selectTab(menu.path)

        this.$router.push(path)
      },
      immediate: true
    }
  },

  created() {},

  methods: {
    ...mapActions('layout', ['selectTab', 'pushTab', 'unshiftTab', 'removeTab', 'clearTab'])
  }
}
</script>

<style lang="scss" scoped>
.layout {
  .layout-body {
    width: 1200px;
    margin: 0 auto;

    display: flex;

    .layout-body-left {
      display: flex;
      justify-content: center;

      width: 63px;
      height: calc(100vh - 56px);

      background: #fff;
      box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
    }

    .layout-body-right {
      flex: 1;

      .layout-body-right-tab {
        display: flex;
        align-items: center;

        height: 40px;
      }
    }
  }
}
</style>
