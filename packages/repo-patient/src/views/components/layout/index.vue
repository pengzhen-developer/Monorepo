<template>
  <div class="layout">
    <!-- 顶部返回 nav-bar -->
    <template v-if="$route.meta.navbar">
      <van-nav-bar :left-arrow="$route.meta.navbar.back" :title="$route.meta.navbar.title" @click-left="back" class="layout-navbar" left-text=" " />
    </template>

    <!-- 中部功能 keepAlive router  -->
    <div class="layout-content">
      <keep-alive>
        <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <!-- 底部导航 tabbar -->
    <template v-if="$route.meta.tabBar">
      <van-tabbar class="layout-tabbar" v-model="active">
        <van-tabbar-item to="/home/index">
          <i class="icon_ic_datatrends" slot="icon"></i>
          <span>首页</span>
        </van-tabbar-item>

        <van-tabbar-item icon="search" to="/message/index">
          <i class="icon_ic_datatrends" slot="icon"></i>
          <span>消息</span>
        </van-tabbar-item>

        <van-tabbar-item icon="setting-o" to="/file/index">
          <i class="icon_ic_datatrends" slot="icon"></i>
          <span>健康档案</span>
        </van-tabbar-item>

        <van-tabbar-item icon="setting-o" to="/setting/index">
          <i class="icon_ic_datatrends" slot="icon"></i>
          <span>个人中心</span>
        </van-tabbar-item>
      </van-tabbar>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      active: 0
    }
  },

  watch: {
    '$route.path': {
      handler(val) {
        const activeDictionary = {
          '/home/index': 0,
          '/message/index': 1,
          '/file/index': 2,
          '/setting/index': 3
        }

        this.active = activeDictionary[val] || this.active
      },
      immediate: true
    }
  },

  created() {
    if (this.$route.path === '/') {
      this.$router.push(peace.config.system.homePage)
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .layout-content {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}

.van-tabbar--fixed {
  position: relative;
}
</style>
