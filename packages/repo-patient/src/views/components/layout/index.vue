<template>
  <div class="layout">
    <!-- 顶部返回 nav-bar -->
    <template v-if="$route.meta.navbar">
      <transition mode="out-in" name="van-fade">
        <van-nav-bar :left-arrow="$route.meta.navbar.back" :title="$route.meta.navbar.title" @click-left="back" class="layout-navbar" left-text=" " />
      </transition>
    </template>

    <!-- 中部功能 keepAlive router  -->
    <div class="layout-content">
      <transition mode="out-in" name="van-fade">
        <keep-alive>
          <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>

      <transition mode="out-in" name="van-fade">
        <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>

    <!-- 底部导航 tabbar -->
    <template v-if="$route.meta.tabBar">
      <transition mode="out-in" name="van-fade">
        <van-tabbar class="layout-tabbar" v-model="active">
          <van-tabbar-item to="/home/index">
            <i class="van-icon van-icon-like-o" slot="icon"></i>
            <span>首页</span>
          </van-tabbar-item>

          <van-tabbar-item icon="search" to="/message/index">
            <i class="van-icon van-icon-comment-o" slot="icon"></i>
            <span>消息</span>
          </van-tabbar-item>

          <van-tabbar-item icon="setting-o" to="/file/index">
            <i class="van-icon van-icon-gift-card-o" slot="icon"></i>
            <span>健康档案</span>
          </van-tabbar-item>

          <van-tabbar-item icon="setting-o" to="/setting/index">
            <i class="van-icon van-icon-user-o" slot="icon"></i>
            <span>个人中心</span>
          </van-tabbar-item>
        </van-tabbar>
      </transition>
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

<style src="./../../style/components.css"></style>
<style src="./../../style/elements.css"></style>
<style src="./../../style/grid.css"></style>
<style src="./../../style/icon.css"></style>
<style src="./../../style/modules.css"></style>

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
