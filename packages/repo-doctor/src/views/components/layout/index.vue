<template>
  <div class="layout">
    <Video></Video>

    <div class="layout-header">
      <TheHeader></TheHeader>
    </div>

    <div class="layout-body">
      <div class="layout-body-left">
        <TheNav ref="layoutNav"></TheNav>
      </div>
      <div class="layout-body-right">
        <div class="layout-body-right-tab">
          <TheTab></TheTab>
        </div>

        <div class="layout-body-right-content">
          <el-scrollbar class="layout-body-right-content-scrollbar">
            <transition mode="out-in" name="el-fade-in-linear">
              <router-view :key="$route.fullPath" class="layout-body-right-content-app">
              </router-view>
            </transition>
          </el-scrollbar>
        </div>
      </div>
    </div>

    <el-backtop target=".layout-body-right-content-scrollbar .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import TheNav from './TheNav'
import TheTab from './TheTab'

import Video from '@src/views/clinic/Video'

import peace from '@src/library'

export default {
  name: 'layout',

  components: {
    TheHeader,
    TheNav,
    TheTab,

    Video
  },

  data() {
    return {
      menuList: peace.config.menu.menuList
    }
  },

  watch: {
    '$route.path': {
      handler() {
        this.$nextTick(function() {
          if (this.$store.state.layout.tabList.length === 0) {
            // 将首页加载到 tab list
            this.pushTab('/home')
          }

          const path = this.$route.path === '/' ? '/home' : this.$route.path

          // 加载当前页
          this.pushTab(path)

          // 跳转当前路由
          this.$router.push(path)
        })
      },
      immediate: true
    },

    '$store.state.layout.tabList': {
      handler() {
        peace.cache.set(
          peace.type.USER.TAB_LIST,
          this.$store.state.layout.tabList,
          peace.type.SYSTEM.CACHE.SESSION_STORAGE
        )
      },

      immediate: true
    }
  },

  methods: {
    pushTab(path) {
      const currentMenu =
        this.menuList.find(item => item.path === path) ||
        this.$store.state.layout.tabList.find(item => item.path === path)

      if (currentMenu) {
        // 将当前选中的项，添加到 tab
        this.$store.commit('layout/pushTab', currentMenu)

        // 选中当前 tab
        this.$store.commit('layout/selectTab', currentMenu.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$--layout-header-height: 56px;
$--layout-body-right-tab-height: 40px;

.layout {
  background: #f9f9f9;

  .layout-header {
    background: #00c6ae;
    height: $--layout-header-height;
  }

  .layout-body {
    width: 1200px;
    height: calc(100vh - #{$--layout-header-height});
    margin: 0 auto;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

    display: flex;
    justify-content: center;

    .layout-body-left {
      width: 63px;
    }

    .layout-body-right {
      flex: 1;
      width: calc(1200px - 63px);
      background: #f9f9f9;

      .layout-body-right-tab {
        display: flex;
        align-items: center;

        height: $--layout-body-right-tab-height;
      }

      .layout-body-right-content {
        margin: 10px 10px 0 10px;
        height: calc(100% - #{$--layout-body-right-tab-height} - 10px);
        background: #f9f9f9;

        .layout-body-right-content-scrollbar {
          height: 100%;
        }

        .layout-body-right-content-app {
          background: #fff;
          padding: 20px;
        }
      }
    }
  }
}
</style>

