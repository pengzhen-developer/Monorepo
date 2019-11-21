<template>

  <div class="layout">
    <!-- 中部功能 keepAlive router  -->
    <div class="layout-content">
      <transition name="van-fade"
                  mode="out-in">
        <vue-page-stack>
          <router-view></router-view>
        </vue-page-stack>
      </transition>
    </div>

    <!-- 底部导航 tabbar -->
    <template v-if="$route.meta.tabBar">
      <transition mode="out-in"
                  name="van-fade">
        <van-tabbar class="layout-tabbar"
                    v-model="active">

          <van-tabbar-item to="/home/index">
            <i @click="showVconsole"
               class="van-icon van-icon-like"
               slot="icon"></i>
            <span>首页</span>
          </van-tabbar-item>

          <template
                    v-if="this.$store.state.inquiry.sessions.reduce((accumulator, currentValue) => accumulator + currentValue.unread, 0) > 0">
            <van-tabbar-item :info="this.$store.state.inquiry.sessions.reduce((accumulator, currentValue) => accumulator + currentValue.unread, 0)"
                             to="/message/index">
              <i class="van-icon van-icon-comment"
                 slot="icon"></i>
              <span>消息</span>
            </van-tabbar-item>
          </template>
          <template v-else>
            <van-tabbar-item to="/message/index">
              <i class="van-icon van-icon-comment"
                 slot="icon"></i>
              <span>消息</span>
            </van-tabbar-item>
          </template>

          <van-tabbar-item to="/file/index">
            <i class="van-icon van-icon-invition"
               slot="icon"></i>
            <span>健康档案</span>
          </van-tabbar-item>

          <van-tabbar-item to="/setting/index">
            <i class="van-icon van-icon-manager"
               slot="icon"></i>
            <span>个人中心</span>
          </van-tabbar-item>
        </van-tabbar>
      </transition>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'

// Load Vconsole
import Vconsole from 'vconsole'

export default {
  data() {
    return {
      active: 0,

      nowClickTime: 0,
      lastClickTime: 0,
      clickCount: 0
    }
  },

  computed: {
    unRead() {
      const reduceFunc = (accumulator, currentValue) => accumulator + currentValue.unread

      return this.$store.state.inquiry.sessions.reduce(reduceFunc, 0)
    }
  },

  watch: {
    '$route.path': {
      handler() {
        const layoutComponentPathMap = {
          '/home/index': 0,
          '/message/index': 1,
          '/file/index': 2,
          '/setting/index': 3
        }

        const key = layoutComponentPathMap[this.$route.path]

        if (key !== undefined) {
          this.active = key
        }
      },
      immediate: true
    }
  },

  created() {
    $peace.layout = this

    if (this.$route.path === '/') {
      this.$router.push(peace.config.system.homePage)
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    showVconsole() {
      this.nowClickTime = new Date().getTime()

      if (this.nowClickTime - this.lastClickTime < 3000) {
        this.clickCount++
      } else {
        this.clickCount = 0
      }
      this.lastClickTime = this.nowClickTime

      if (this.clickCount >= 10) {
        if (this.Vconsole) {
          this.Vconsole.destroy()
          this.Vconsole = undefined
        } else {
          this.Vconsole = new Vconsole()
        }

        this.clickCount = 0
      }
    }
  }
}
</script>


<style src="./../../views/style/style.css"></style>

<style lang="scss" scoped>
.layout,
/deep/ .van-pull-refresh,
/deep/ .van-pull-refresh__track {
  height: 100%;
  display: flex;
  flex-direction: column;

  /deep/ .van-tabbar {
    border-top: 1px solid #eeeeee50;

    [class*='van-hairline']::after {
      border-bottom: 0;
    }
  }

  /deep/ .van-tabbar--fixed {
    position: unset;
    bottom: 0;
    left: 0;
  }

  .layout-content {
    width: 100%;
    flex: 1;
    overflow: auto;
    /*margin-bottom: 40px;*/
  }
}
</style>
