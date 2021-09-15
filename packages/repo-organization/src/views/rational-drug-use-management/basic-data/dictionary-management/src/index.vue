<template>
  <div class="layout-route">
    <div class="flex">
      <el-tabs class="full-width"
               type="card"
               v-model="active"
               v-on:tab-click="handleClick">
        <el-tab-pane v-for="menu in menuList"
                     v-bind:key="menu.id"
                     v-bind:name="menu.id"
                     v-bind:label="menu.title">
        </el-tab-pane>
      </el-tabs>
      <iframeContainer v-if="type === 'iframe'"
                       class="bg-white q-pa-md"
                       ref="iframe"
                       v-bind:src="src"
                       v-bind:full-height="true"></iframeContainer>
      <div v-if="type === 'component'"
           class="full-width bg-white ">
        <component v-bind:is="src"></component>
      </div>

    </div>
  </div>
</template>

<script>
import CONSTANT from './constant'
import iframeContainer from '@src/views/iframe'
import DrugPackagingInformation from './components/drug-packaging-information'
import DiseaseMaintain from './components/disease-maintain'
import AllergyMaintain from './components/allergy-maintain'
import PopulationMaintain from './components/population-maintain'
import ICD from './components/ICD'
import DrugChannel from './components/drug-channel'
import DrugFrequency from './components/drug-frequency'

//import { dom } from 'quasar'

export default {
  name: 'RuleDictionary',
  components: {
    iframeContainer,
    DrugPackagingInformation,
    DiseaseMaintain,
    AllergyMaintain,
    PopulationMaintain,
    ICD,
    DrugChannel,
    DrugFrequency
  },

  data() {
    return {
      menuList: CONSTANT.menuList,
      active: '',
      type: '',
      src: ''
    }
  },
  created() {
    this.active = '0'
    this.type = this.menuList[Number(this.active)].type
    if (this.type === 'component') {
      this.src = this.menuList[Number(this.active)].url
    } else {
      this.src = process.env.VUE_APP_SITE_PRESCRIPTION + this.menuList[Number(this.active)].url
    }
  },
  // mounted() {
  //   this.$nextTick(function() {
  //     // dom.offset 是 quasar 提供的工具类
  //     // 自行了解相关 api 文档
  //     const offset = dom.offset(this.$refs.iframe.$el)

  //     // iframe 铺满全屏
  //     this.$refs.iframe.$el.style.height = `${document.body.clientHeight - offset?.top - 20}px`
  //   })
  // },
  methods: {
    handleClick() {
      this.type = this.menuList[Number(this.active)].type
      if (this.type === 'component') {
        this.src = this.menuList[Number(this.active)].url
      } else {
        this.src = process.env.VUE_APP_SITE_PRESCRIPTION + this.menuList[Number(this.active)].url
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