<template>
  <div>
    <div class="text-h6 q-mb-md">{{ custName }}</div>

    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">选择配置规则</div>
      <div class="q-mr-md">：</div>
      <div class="col">
        <el-radio-group v-model="pharmacyRule.RuleFlag"
                        v-on:change="change">
          <el-radio-button v-for="ruleItem in RuleFlagMap"
                           v-bind:key="ruleItem.value"
                           v-bind:label="ruleItem.value">{{ ruleItem.label }}</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <template v-if="pharmacyRule.RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '不限').value">
      <DrugFlowByAll v-bind:pharmacyRule.sync="pharmacyRule"
                     v-bind:pharmacyConf.sync="pharmacyConf"
                     v-bind:data.sync="data"></DrugFlowByAll>
    </template>

    <template v-if="pharmacyRule.RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '按品种').value">
      <DrugFlowByVariety v-bind:pharmacyRule.sync="pharmacyRule"
                         v-bind:pharmacyConf.sync="pharmacyConf"
                         v-bind:data.sync="data"></DrugFlowByVariety>
    </template>

    <template v-if="pharmacyRule.RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '按病种').value">
      <DrugFlowByDisease v-bind:pharmacyRule.sync="pharmacyRule"
                         v-bind:pharmacyConf.sync="pharmacyConf"
                         v-bind:data.sync="data"></DrugFlowByDisease>
    </template>
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
  components: {
    DrugFlowByAll,
    DrugFlowByVariety,
    DrugFlowByDisease
  },

  props: {
    custName: String,
    pharmacyRule: Object,
    pharmacyConf: Object,
    data: Array
  },

  data() {
    return {
      CONSTANT,

      // 可选规则列表
      RuleFlagMap: CONSTANT.RULE_FLAG_MAP
      // 当前选中的配置规则，默认不限
    }
  },

  methods: {
    change() {
      this.data.splice(0, this.data.length)
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