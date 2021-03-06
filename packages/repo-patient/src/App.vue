<template>
  <div id="app">
    <ActiveHome v-show="canShowActiveHome"></ActiveHome>

    <div class="layout">
      <!-- 中部功能 keepAlive router  -->
      <div class="layout-content">
        <vue-page-stack>
          <router-view></router-view>
        </vue-page-stack>
      </div>

      <!-- 底部导航 tabbar -->
      <template v-if="$route.meta.tabBar">
        <transition mode="out-in"
                    name="van-fade">
          <van-tabbar class="layout-tabbar"
                      :fixed="false"
                      :z-index='999'
                      v-model="active">

            <van-tabbar-item to="/home/index">
              <i @click="showVconsole"
                 class="van-icon van-icon-like"
                 slot="icon"></i>
              <span>首页</span>
            </van-tabbar-item>

            <template v-if="unRead > 0">
              <van-tabbar-item :dot="unRead"
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
  </div>
</template>

<script>
import peace from '@src/library'

// Load Vconsole
import Vconsole from 'vconsole'

// Active home
import ActiveHome from '@src/views/components/ActiveHome'

//微信sdk
import wx from 'weixin-js-sdk'
export default {
  name: 'app',

  components: {
    ActiveHome
  },

  data() {
    return {
      active: 0,

      nowClickTime: 0,
      lastClickTime: 0,
      clickCount: 0,
      config: {
        debug: false,
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: '',
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      },
      canShowActiveHome: false
    }
  },

  computed: {
    unRead() {
      let unReadMessage = 0
      if (this.$store.getters['inquiry/sessionList'] && this.$store.getters['inquiry/sessionList'].length > 0) {
        const reduceFunc = (accumulator, currentValue) => accumulator + currentValue.unread
        unReadMessage = this.$store.getters['inquiry/sessionList'].reduce(reduceFunc, 0)
      }

      let unReadServiceRemind = this.$store.state.inquiry.serviceRemind.unreadNum

      return unReadMessage + unReadServiceRemind > 0 ? true : false
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

        const showActiveHomePathMap = ['/home/index', '/message/index', '/file/index', '/setting/index', '/login', '/WXAuth', '/redirect']
        const index = showActiveHomePathMap.findIndex((item) => item == this.$route.path)
        this.canShowActiveHome = index > -1 ? false : true
      },
      immediate: true
    }
  },

  beforeCreate() {
    document.title = peace.config.system.title

    // step 1, 当页面可见性发生变化
    // step 2, 验证当前活动元素是否是 INPUT（INPUT 会触发输入框，导致微信页面变形）
    // step 3, 让当前活动元素进行 blur focus blur 重新触发输入法的布局
    window.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        const activeElement = document.activeElement

        if (activeElement.tagName === 'INPUT') {
          activeElement.blur()
          activeElement.focus()
          activeElement.blur()
        }
      }
    })
  },

  created() {
    this.restoreUserInfo()
    this.initSensors()
    // 待优化项
    // 当系统初始化时，App.vue 优先于 Component.vue 执行
    // 当访问系统入口 Redirect.vue 时
    // 会判断渠道，如果渠道发生变化，会移除用户信息，重新登录，因此出现无 token 访问接口的问题
    // 此处延迟 1000ms， 等待 Redirect.vue 加载完成后，判断是否需要执行 IM
    setTimeout(() => {
      this.initNIM()
      this.initShareConfig()
      this.getSystemInfo()
    }, 1000)
  },

  methods: {
    getSystemInfo() {
      peace.service.login.getInfo().then((res) => {
        if (res.data.timestamp) {
          peace.config.system.timeDifference = new Date().getTime() - res.data.timestamp
        } else {
          peace.config.system.timeDifference = 0
        }
      })
    },

    initShareConfig() {
      let url = location.href.split('#')[0]
      peace.service.index.getWXSign({ url: url }).then((res) => {
        for (let i in res.data) {
          if (i !== 'url') {
            this.config[i] = res.data[i]
          }
        }
        wx.config(this.config)
        wx.checkJsApi({
          jsApiList: this.config.jsApiList,
          success: function() {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        })
      })
    },

    restoreUserInfo() {
      const userInfo = peace.cache.get(peace.type.USER.INFO)

      if (userInfo) {
        this.$store.commit('user/restoreUserInfo', userInfo)
      }
      //初始化清除 清除缓存
      peace.cache.remove(peace.type.SYSTEM.IS_EWM)
      peace.cache.remove(peace.type.SYSTEM.EWM_INFO)
    },

    initNIM() {
      const userInfo = peace.cache.get(peace.type.USER.INFO)

      if (userInfo) {
        peace.service.IM.initNIMS()
      }
    },
    initSensors() {
      $peace.service.sensors.getSensors()
    },
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

<style lang="scss" scoped>
#app {
  // height: 100vh;
  height: 100%;
}
</style>


<style src="./views/style/style.css"></style>

<style lang="scss" scoped>
.layout,
::v-deep .van-pull-refresh,
::v-deep .van-pull-refresh__track {
  height: 100%;
  display: flex;
  flex-direction: column;

  ::v-deep .van-tabbar {
    border-top: 1px solid #eeeeee;

    [class*='van-hairline']::after {
      border-bottom: 0;
    }
  }

  ::v-deep .van-tabbar--fixed {
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
