<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <el-form ref="validateForm"
             inline
             space-none
             v-if="isEditing"
             class="flex items-center"
             v-bind:show-message="false"
             v-bind:model="model">

      <div class="flex row items-center">
        <el-select v-model="model.treatmentRuleList.operator"
                   placeholder="请选择"
                   style="width: 100px; margin-right: 8px;">
          <el-option v-for="item in source.Compare"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <el-input-number v-model="model.treatmentRuleList.daysOfTreatment"
                         :precision="2"
                         :controls="false"
                         :min="0"
                         class="q-mr-8"
                         placeholder="请输入"></el-input-number>
        <span>天</span>

      </div>

    </el-form>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-8"> {{model.treatmentRuleList.operator | filterDictionary(source.Compare,'--')}}</span>
      <span class="q-mr-8">{{ model.treatmentRuleList.daysOfTreatment ||  (model.treatmentRuleList.daysOfTreatment === 0 ? '0' : '--')  }}</span>
      <span>天</span>

    </div>
  </div>
</template>

<script>
import CONSTANT from '../constant'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      source: {
        Compare: []
      }
    }
  },

  async mounted() {
    this.source.Compare = await Peace.identity.dictionary.getList('compare')
  },

  methods: {
    verificationResults() {
      const tmp = this.model.treatmentRuleList
      if (tmp.daysOfTreatment || tmp.daysOfTreatment === 0) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        return CONSTANT.RULE_VALIDATION_RESULTS.未开始
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-style {
  width: 150px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  padding-top: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  margin-right: 8px;

  ::v-deep {
    .el-input__inner {
      border: 0;
    }
  }
}
</style>
