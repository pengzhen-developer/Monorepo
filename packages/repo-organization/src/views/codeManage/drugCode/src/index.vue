<template>
  <div class="layout-route bg-white">

    <div class="card card-search text-center q-mb-md">
      <el-radio-group v-model="tabPosition">
        <el-radio-button label="left">{{ activeName }}配码</el-radio-button>
        <el-radio-button label="right">配码审核</el-radio-button>
      </el-radio-group>
    </div>

    <iframeContainer ref="iframe"
                     v-bind:src="src"></iframeContainer>
  </div>
</template>


<script>
import CONSTANT from './constant'
import iframeContainer from '@src/views/iframe'

import { dom } from 'quasar'

export default {
  components: {
    iframeContainer
  },

  data() {
    return {
      avtiveName: '药品信息',
      tabPosition: '',
      src: ''
    }
  },

  watch: {
    tabPosition() {
      this.src = process.env.VUE_APP_SITE_PRESCRIPTION + CONSTANT.IFRAME_URL[this.avtiveName][this.tabPosition]
    }
  },

  created() {
    this.tabPosition = 'left'
  },

  mounted() {
    this.$nextTick(function () {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this.$refs.iframe.$el)

      // iframe 铺满全屏
      this.$refs.iframe.$el.style.height = `${document.body.clientHeight - offset?.top - 20}px`
    })
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