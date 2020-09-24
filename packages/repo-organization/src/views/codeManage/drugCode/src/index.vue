<template>
  <div class="layout-route">

    <div class="card card-search text-center">
      <el-radio-group v-model="tabPosition">
        <el-radio-button label="left">{{ activeName }}配码</el-radio-button>
        <el-radio-button label="right">配码审核</el-radio-button>
      </el-radio-group>
    </div>
    <div class="card"
         v-bind:style="routerViewIframeStyle">

      <div v-show="loading"
           class="flex full-width full-height justify-center items-center"
           v-loading="loading">

      </div>

      <iframe v-show="!loading"
              ref="iframe"
              :src="iframeSrc"
              width="100%"
              height="100%"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"
              allowtransparency="yes"></iframe>
    </div>
  </div>
</template>


<script>
import CONSTANT from './constant'
import { dom } from 'quasar'
import Util from '@src/util'

export default {
  components: {},
  data() {
    return {
      loading: true,
      activeName: '药品信息',
      tabPosition: 'left',
      routerViewIframeStyle: {},
      source: {
        IFRAME_URL: CONSTANT.IFRAME_URL
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      // 设定滚动区域样式
      this.setScrollAreaStyle()
      // 设定路由区域样式
      this.setRouterViewStyle()

      const iframe = this.$refs.iframe

      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.loading = false
        })
      } else {
        iframe.onload = () => {
          this.loading = false
        }
      }
    })
  },

  computed: {
    iframeSrc() {
      const url = CONSTANT.IFRAME_URL[this.activeName][this.tabPosition]
      if (url) {
        return process.env.VUE_APP_PRESCRIPTION_SITE + url + '?sso=true&token=' + Util.user.getUserToken()
      } else {
        return ''
      }
    }
  },

  watch: {
    // 路由更新，还原 nav
    iframeSrc() {
      this.loading = true
    }
  },

  methods: {
    setScrollAreaStyle() {
      const offset = dom.offset(this?.$el)

      this.scrollAreaStyle = {
        height: `${document.body.clientHeight - offset?.top}px`
      }
    },

    setRouterViewStyle() {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this?.$el)

      // 外部 iframe 设定高度，由 iframe 具体功能控制滚动
      this.routerViewIframeStyle = {
        ['height']: `${document.body.clientHeight - offset?.top}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-menu div {
  padding: 9px 42px;
  margin-right: 8px;
  cursor: pointer;
}

.active {
  background: white;
  color: var(--q-color-primary);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.normal {
  background: #efefef;
  border: none;
}
</style>