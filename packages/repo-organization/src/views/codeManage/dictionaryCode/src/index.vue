<template>
  <div class="layout-route">
    <div class="tab-menu row">
      <div v-bind:class="{ active: activeName === '给药途径', normal: activeName !== '给药途径'}"
           v-on:click="handleClick('给药途径')">给药途径</div>
      <div v-bind:class="{ active: activeName === '用药频次', normal: activeName !== '用药频次'}"
           v-on:click="handleClick('用药频次')">用药频次</div>
      <div v-bind:class="{ active: activeName === '用药单位', normal: activeName !== '用药单位'}"
           v-on:click="handleClick('用药单位')">用药单位</div>
    </div>

    <div class="card card-search text-center">
      <el-radio-group v-model="tabPosition">
        <el-radio-button label="left">{{ activeName }}配码</el-radio-button>
        <el-radio-button label="right">配码审核</el-radio-button>
      </el-radio-group>
    </div>

    <iframeContainer class="bg-white q-pa-md"
                     ref="iframe"
                     v-bind:src="src"></iframeContainer>

  </div>
</template>

<script>
import CONSTANT from './../constant'
import iframeContainer from '@src/views/iframe'

import { dom } from 'quasar'

export default {
  components: {
    iframeContainer
  },

  data() {
    return {
      src: '',
      activeName: '',
      tabPosition: '',
      model: {
        words: '',
        status: '',
        checkStatus: ''
      }
    }
  },

  watch: {
    tabPosition() {
      this.src = process.env.VUE_APP_SITE_PRESCRIPTION + CONSTANT.IFRAME_SRC_MAP[this.activeName][this.tabPosition]
    },

    activeName() {
      this.src = process.env.VUE_APP_SITE_PRESCRIPTION + CONSTANT.IFRAME_SRC_MAP[this.activeName][this.tabPosition]
    }
  },

  created() {
    this.activeName = '给药途径'
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
  },

  methods: {
    handleClick(title) {
      if (this.activeName != title) {
        this.loading = true
        this.activeName = title
        this.tabPosition = 'left'
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
  border: 1px solid #fff;
  color: var(--q-color-primary);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.normal {
  border: 1px solid #f5f5f5;
  background: #efefef;
  border: none;
}
</style>