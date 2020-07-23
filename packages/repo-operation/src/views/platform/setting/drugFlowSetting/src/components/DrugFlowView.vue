<template>
  <div>

    <div class="text-body1 text-center">预览详情</div>

    <div class="text-h6 q-mb-md">{{ custName }}</div>

    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">已选配置规则</div>
      <div class="q-mr-md">：</div>
      <div class="col">{{ RuleFlagLabel }}</div>
    </div>

    <template v-if="RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '不限').value">
      <DrugFlowByAllView v-bind:data.sync="data"></DrugFlowByAllView>
    </template>

    <template v-if="RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '按品种').value">
      <DrugFlowByVarietyView v-bind:data.sync="data"></DrugFlowByVarietyView>
    </template>

    <template v-if="RuleFlag === CONSTANT.RULE_FLAG_MAP.find((item) => item.label === '按病症').value">
      <DrugFlowByDiseaseView v-bind:data.sync="data"></DrugFlowByDiseaseView>
    </template>

  </div>
</template>

<script>
import CONSTANT from './../../constant'

/** 不限制 */
import DrugFlowByAllView from './DrugFlowByAllView'
/** 按品种 */
import DrugFlowByVarietyView from './DrugFlowByVarietyView'
/** 按品种 */
import DrugFlowByDiseaseView from './DrugFlowByDiseaseView'

export default {
  components: {
    DrugFlowByAllView,
    DrugFlowByVarietyView,
    DrugFlowByDiseaseView
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

      // 当前选中的配置规则，默认不限
      RuleFlag: '',
      RuleFlagLabel: ''
    }
  },

  watch: {
    pharmacyRule: {
      handler() {
        this.RuleFlag = this.pharmacyRule.RuleFlag
        this.RuleFlagLabel = CONSTANT.RULE_FLAG_MAP.find((item) => item.value === this.pharmacyRule.RuleFlag)?.label
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>