<template>
  <div>
    <div class="q-mb-lg">
      <el-button type="primary"
                 icon="el-icon-arrow-left"
                 v-on:click="back">返回上一页</el-button>
    </div>

    <div class="text-h6 q-mb-md">互联网医院</div>

    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">选择配置规则</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <el-radio-group v-model="ruleChecked">
          <el-radio-button v-for="rule in ruleList"
                           v-bind:key="rule"
                           v-bind:label="rule">{{ rule }}</el-radio-button>
        </el-radio-group>

      </div>
    </div>

    <Component v-bind:is="ComponentInstance"></Component>
  </div>
</template>

<script>
import CONSTANT from './../../constant'

/** 不限制 */
import DrugFlowByAll from './DrugFlowByAll'
/** 按品种 */
import DrugFlowByVariety from './DrugFlowByVariety'
/** 按品种 */
import DrugFlowByDisease from './DrugFlowByDisease'

export default {
  inject: ['provideSetDispalyView'],

  data() {
    return {
      // 可选规则列表
      ruleList: CONSTANT.RULE_LIST,
      // 默认不限
      ruleChecked: CONSTANT.RULE_LIST.不限
    }
  },

  computed: {
    ComponentInstance() {
      const ruleComponentMap = {
        [CONSTANT.RULE_LIST.不限]: DrugFlowByAll,
        [CONSTANT.RULE_LIST.按品种]: DrugFlowByVariety,
        [CONSTANT.RULE_LIST.按病种]: DrugFlowByDisease
      }

      return ruleComponentMap[this.ruleChecked]
    },

    setDispalyView() {
      return this.provideSetDispalyView
    }
  },

  methods: {
    back() {
      this.setDispalyView(CONSTANT.DISPLAY_VIEW.列表)
    }
  }
}
</script>

<style lang="scss" scoped>
.em-6 {
  width: 6em;
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
}
</style>