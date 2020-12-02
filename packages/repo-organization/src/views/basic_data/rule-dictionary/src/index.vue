<template>
  <div class="layout-route">
    <div class="flex">
      <el-tabs class=" full-width"
               v-model="active"
               type="card"
               v-on:tab-click="handleClick">
        <el-tab-pane v-for="(menu,index) in menuList"
                     v-bind:key="index"
                     v-bind:name="index.toString()"
                     v-bind:label="menu.title">
        </el-tab-pane>
      </el-tabs>
      <iframeContainer class="bg-white q-pa-md"
                       ref="iframe"
                       v-bind:src="src"></iframeContainer>
    </div>
  </div>
</template>

<script>
import CONSTANT from './../constant'
import iframeContainer from '@src/views/iframe'

import { dom } from 'quasar'

export default {
  name: 'RuleDictionary',
  components: {
    iframeContainer
  },

  data() {
    return {
      menuList: CONSTANT.menuList,
      src: '',
      active: '',
      tabPosition: '',
      model: {
        words: '',
        status: '',
        checkStatus: ''
      }
    }
  },

  watch: {
    active() {
      this.src = process.env.VUE_APP_SITE_PRESCRIPTION + this.menuList[this.active].url
    }
  },
  created() {
    this.active = 0
    this.src = process.env.VUE_APP_SITE_PRESCRIPTION + this.menuList[this.active].url
  },
  mounted() {
    this.$nextTick(function() {
      // dom.offset 是 quasar 提供的工具类
      // 自行了解相关 api 文档
      const offset = dom.offset(this.$refs.iframe.$el)

      // iframe 铺满全屏
      this.$refs.iframe.$el.style.height = `${document.body.clientHeight - offset?.top - 20}px`
    })
  },

  methods: {
    handleClick(menu) {
      if (this.active != menu.index) {
        this.loading = true
        this.active = menu.index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs {
  .el-tabs__header {
    margin: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item {
    padding-left: 42px !important;
    padding-right: 42px !important;
    background: #efefef;
    border: 1px solid #f5f5f5;
    margin: 0 8px 0 0;
    border-radius: 4px 4px 0 0;
    font-weight: 400;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: 0;
  }

  &.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #fff;
    background: #fff;
  }
}
</style>