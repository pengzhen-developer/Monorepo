<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <el-form v-if="isEditing"
             ref="validateForm"
             class="flex items-center"
             inline
             space-none
             v-bind:model="model"
             v-bind:show-message="false">

      <div class="flex row items-center">
        <el-select v-model="model.dosageRuleList.dosagetype"
                   placeholder="请选择"
                   style="width: 100px;">
          <el-option v-for="item in source.DosageType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <el-input-number v-model="model.dosageRuleList.eachMinDose"
                         :controls="false"
                         :max="parseFloat(model.dosageRuleList.eachMaxDose)"
                         :min="0"
                         :precision="5"
                         class="q-mr-8 q-ml-8"
                         placeholder="请输入"></el-input-number>
        <span>至</span>
        <el-input-number v-model="model.dosageRuleList.eachMaxDose"
                         :controls="false"
                         :min="parseFloat(model.dosageRuleList.eachMinDose)"
                         :precision="5"
                         class="q-mr-8 q-ml-8"
                         placeholder="请输入"></el-input-number>

        <div class="input-number-style justify-center"
             v-on:click="addUnit">
          <span v-if="!model.dosageRuleList.doseUnit"
                class="text-primary">请选择</span>
          <span>{{ model.dosageRuleList.doseUnit }}</span>
        </div>

      </div>

    </el-form>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-8"> {{model.dosageRuleList.dosagetype | filterDictionary(source.DosageType,'--')}}</span>
      <span class="q-mr-8">{{ model.dosageRuleList.dosagetype === '0'? model.dosageRuleList.eachMinDose : model.dosageRuleList.dailyMinDose }}</span>
      <span class="q-mr-8">至</span>
      <span class="q-mr-8">{{ model.dosageRuleList.dosagetype === '0'? model.dosageRuleList.eachMaxDose : model.dosageRuleList.dailyMaxDose }}</span>
      <span>{{ model.dosageRuleList.doseUnit }}</span>

    </div>

    <!-- 选择单位 -->
    <PeaceDialog v-if="dialog.visible"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialog.visible"
                 append-to-body
                 title="请选择单位"
                 width="500px">
      <ChoiceUnitDialog v-bind:data="dialog.data"
                        v-on:onClose="dialog.visible = false"
                        v-on:onSuccess="editIndication" />
    </PeaceDialog>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import ChoiceUnitDialog from './ChoiceUnitDialog'

export default {
  props: {
    model: Object,
    isEditing: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    ChoiceUnitDialog
  },
  data() {
    return {
      source: {
        DosageType: []
      },
      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  async mounted() {
    this.source.DosageType = await Peace.identity.dictionary.getList('dosage_type')
  },

  watch: {
    'model.dosageRuleList.eachMinDose'(timeRange) {
      this.model.dosageRuleList.dailyMinDose = timeRange
    },
    'model.dosageRuleList.eachMaxDose'(timeRange) {
      this.model.dosageRuleList.dailyMaxDose = timeRange
    },
    'model.dosageRuleList.dailyMinDose'(timeRange) {
      this.model.dosageRuleList.eachMaxDose = timeRange
    },
    'model.dosageRuleList.dailyMaxDose'(timeRange) {
      this.model.dosageRuleList.eachMaxDose = timeRange
    }
  },

  methods: {
    addUnit() {
      this.dialog.data = this.model.dosageRuleList
      this.dialog.visible = true
    },

    editIndication(data) {
      this.model.dosageRuleList.doseUnit = data.unit
      this.model.dosageRuleList.unitType = data.unitType
      this.dialog.visible = false
    },

    verificationResults() {
      const tmp = this.model.dosageRuleList
      if (tmp.dosagetype === '0') {
        if (
          (tmp.eachMinDose || tmp.eachMinDose === 0) &&
          (tmp.eachMaxDose || tmp.eachMaxDose === 0) &&
          tmp.unitType &&
          tmp.doseUnit
        ) {
          return CONSTANT.RULE_VALIDATION_RESULTS.已完成
        } else {
          if (
            tmp.eachMinDose ||
            tmp.eachMinDose === 0 ||
            tmp.eachMaxDose ||
            tmp.eachMaxDose === 0 ||
            tmp.unitType ||
            tmp.doseUnit
          ) {
            return CONSTANT.RULE_VALIDATION_RESULTS.未完成
          } else {
            return CONSTANT.RULE_VALIDATION_RESULTS.未开始
          }
        }
      } else {
        if (
          (tmp.dailyMinDose || tmp.dailyMinDose === 0) &&
          (tmp.dailyMaxDose || tmp.dailyMaxDose === 0) &&
          tmp.unitType &&
          tmp.doseUnit
        ) {
          return CONSTANT.RULE_VALIDATION_RESULTS.已完成
        } else {
          if (
            tmp.dailyMinDose ||
            tmp.dailyMinDose === 0 ||
            tmp.dailyMaxDose ||
            tmp.dailyMaxDose === 0 ||
            tmp.unitType ||
            tmp.doseUnit
          ) {
            return CONSTANT.RULE_VALIDATION_RESULTS.未完成
          } else {
            return CONSTANT.RULE_VALIDATION_RESULTS.未开始
          }
        }
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
