<template>
  <div class="layout">
    <!-- 返回 -->
    <template v-if="$route.meta.back">
      <van-nav-bar :title="$route.meta.back.title" @click-left="back" class="layout-navbar" left-arrow left-text=" " />
    </template>

    <!-- keepAlive -->
    <div class="layout-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>

      <!-- not keepAlive -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>

    <template v-if="!($route.meta.tabBar && $route.meta.tabBar.visible === false)">
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
    flex: 1;
    overflow: auto;
  }
}

.van-tabbar--fixed {
  position: relative;
}
</style>
