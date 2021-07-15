<template>
  <div class="rule-item__content flex items-center q-pa-sm q-mr-md">
    <div class="flex row items-center"
         v-if="isEditing">
      <el-select v-model="model.extremeDoseRuleList.dosageType"
                 placeholder="请选择"
                 style="width: 100px; margin-right: 8px;">
        <el-option v-for="item in source.DosageType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span>超过</span>

      <el-input-number v-model="model.extremeDoseRuleList.maxDose"
                       :controls="false"
                       class="q-mr-8 q-ml-8"
                       :precision="5"
                       :min="0"
                       placeholder="请输入"></el-input-number>

      <div v-on:click="addUnit"
           class="input-number-style justify-center">
        <span v-if="!model.extremeDoseRuleList.doseUnit"
              class="text-primary">请选择</span>
        <span>{{ model.extremeDoseRuleList.doseUnit }}</span>
      </div>

    </div>

    <div class="flex row items-center"
         v-else>
      <span class="q-mr-8"> {{model.extremeDoseRuleList.dosageType | filterDictionary(source.DosageType,'--')}}</span>
      <span class="q-mr-8">超过</span>
      <span class="q-mr-8">{{model.extremeDoseRuleList.maxDose}}</span>
      <span>{{ model.extremeDoseRuleList.doseUnit }}</span>

    </div>
    <!-- 选择单位 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialog.visible"
                 title="请选择单位"
                 v-if="dialog.visible"
                 width="500px">
      <ChoiceUnitDialog v-on:onSuccess="editIndication"
                        v-bind:data="dialog.data"
                        v-on:onClose="dialog.visible = false" />
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

  methods: {
    addUnit() {
      this.dialog.data = this.model.extremeDoseRuleList
      this.dialog.visible = true
    },

    editIndication(data) {
      this.model.extremeDoseRuleList.doseUnit = data.unit
      this.model.extremeDoseRuleList.unitType = data.unitType
      this.dialog.visible = false
    },

    verificationResults() {
      const tmp = this.model.extremeDoseRuleList
      if ((tmp.maxDose || tmp.maxDose === 0) && tmp.doseUnit && tmp.unitType) {
        return CONSTANT.RULE_VALIDATION_RESULTS.已完成
      } else {
        if (tmp.maxDose || tmp.maxDose === 0 || tmp.doseUnit || tmp.unitType) {
          return CONSTANT.RULE_VALIDATION_RESULTS.未完成
        } else {
          return CONSTANT.RULE_VALIDATION_RESULTS.未开始
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
