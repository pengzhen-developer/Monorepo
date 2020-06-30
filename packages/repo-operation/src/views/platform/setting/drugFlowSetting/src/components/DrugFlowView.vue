<template>
  <div>
    <div class="text-h6 q-mb-md">互联网医院</div>

    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">已选配置规则</div>
      <div class="q-mr-md">：</div>
      <div class="col">{{ type }}</div>
    </div>

    <Component v-bind:is="ComponentInstance"
               v-bind:data="data"></Component>
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
  props: {
    data: Object,

    type: String
  },

  computed: {
    ComponentInstance() {
      const ruleComponentMap = {
        [CONSTANT.RULE_LIST.不限]: DrugFlowByAllView,
        [CONSTANT.RULE_LIST.按品种]: DrugFlowByVarietyView,
        [CONSTANT.RULE_LIST.按病种]: DrugFlowByDiseaseView
      }

      return ruleComponentMap[this.type]
    }
  }
}
</script>

<style>
</style>