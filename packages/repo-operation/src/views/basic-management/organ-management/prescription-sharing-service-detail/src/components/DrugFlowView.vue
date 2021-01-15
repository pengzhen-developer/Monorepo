<template>
  <div class="q-pl-14">
    <div class="flex items-center q-mb-lg">
      <div class="em-6 text-justify">已选配置规则</div>
      <div class="q-mr-md">：</div>
      <div class="col">{{type}}</div>
    </div>
    <template>
      <DrugFlowByVarietyView v-bind:data="data"></DrugFlowByVarietyView>
    </template>

  </div>
</template>

<script>
/** 按品种 */
import DrugFlowByVarietyView from './DrugFlowByVarietyView'

export default {
  props: {
    data: Array,
    type: String
  },
  components: {
    DrugFlowByVarietyView
  },
  data() {
    return {}
  },

  created() {}
}
</script>

<style>
</style>