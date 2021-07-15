<template>
  <div class="full-width full-height column">
    <div class="card card-search relative-position q-mb-md">
      <div class="q-mb-lg">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>

      <span class="text-weight-medium text-grey-333" style="font-size: 20px;">药品规则编辑</span>

      <div class="q-mb-md q-mt-xs">
        <span class="text-weight-medium q-mr-md">{{ drugInfo.drugName }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.dosageFormName }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.specifications }}</span>
        <span class="text-grey-666  q-mr-md">{{ drugInfo.manufacturer }}</span>
      </div>

    </div>

    <rules-detail :id="drugInfo.drugCscCode" drug-type="platform"></rules-detail>
  </div>
</template>

<script>
import RulesDetail from "@views/rational-drug-use-management/rules-of-drug/Prescription_Rule/src/RulesDetail";
export default {
  name: "DrugRuleDetail",
  components: { RulesDetail  },
  props: {
    drugInfo: {
      required: true,
      type: Object,
    }
  },
  data() {
    return {

    }
  },
  async mounted() {

  },
  methods: {
    back() {
      this.$emit('onDetailBack')
    },
    ruleModels(data) {
      console.log(data)
    },
    submit() {

    },
  }
}
</script>

<style lang="scss" scoped>
.toolbar-style {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  margin-top: 16px;
  padding: 16px;
}
</style>
